import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import SkillBadge from './SkillBadge';
import ProjectCard from './ProjectCard';
import ProfileHeader from './ProfileHeader';
import { LoadingSpinner, ErrorMessage } from './LoadingSpinner';

const ProfileView = ({ featured = false }) => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (featured) {
        // Fetch Vashu Kumar's profile for home page
        response = await api.getProfileByUsername('vashukumar');
      } else if (username) {
        // Fetch profile by username from URL
        response = await api.getProfileByUsername(username);
      } else {
        throw new Error('No username provided');
      }

      setProfile(response.data);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load profile. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShareProfile = () => {
    const profileUrl = window.location.href;
    navigator.clipboard
      .writeText(profileUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  const handleSkillClick = (skill) => {
    const skillName = typeof skill === 'object' ? skill.name : skill;
    setSelectedSkills((prev) => {
      if (prev.includes(skillName)) {
        return prev.filter((s) => s !== skillName);
      } else {
        return [...prev, skillName];
      }
    });
  };

  const filterProjects = () => {
    if (!profile?.projects) return [];

    return profile.projects.filter((project) => {
      // Filter by selected skills
      if (selectedSkills.length > 0) {
        const hasSelectedSkill = selectedSkills.some((skill) =>
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(skill.toLowerCase())
          )
        );
        if (!hasSelectedSkill) return false;
      }

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title?.toLowerCase().includes(query);
        const matchesDescription = project.description?.toLowerCase().includes(query);
        const matchesTech = project.technologies?.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDescription || matchesTech;
      }

      return true;
    });
  };

  const filteredProjects = filterProjects();

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Share Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleShareProfile}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
          >
            {copySuccess ? (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M15 8a3 3 0 01-2.977 2.963l-3.738 3.738a3 3 0 11-1.414-1.414l3.738-3.738A3 3 0 1115 8z" />
                </svg>
                Share Profile
              </>
            )}
          </button>
        </div>

        {/* Profile Header */}
        <ProfileHeader profile={profile} />

        {/* Bio Section */}
        {profile.bio && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
          </div>
        )}

        {/* Skills Section */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Skills
              {selectedSkills.length > 0 && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({selectedSkills.length} selected)
                </span>
              )}
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Click on a skill to filter projects
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => {
                const skillName = typeof skill === 'object' ? skill.name : skill;
                return (
                  <SkillBadge
                    key={index}
                    skill={skill}
                    rating={profile.rating?.get?.(skill) || profile.rating?.[skill]}
                    onClick={() => handleSkillClick(skill)}
                    isActive={selectedSkills.includes(skillName)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Education Section */}
        {profile.education && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
            <div className="space-y-2">
              {profile.education.degree && (
                <p className="text-lg font-semibold text-gray-800">
                  {profile.education.degree}
                  {profile.education.field && ` in ${profile.education.field}`}
                </p>
              )}
              {profile.education.institution && (
                <p className="text-gray-600">{profile.education.institution}</p>
              )}
              {profile.education.year && (
                <p className="text-gray-500">{profile.education.year}</p>
              )}
              {profile.education.gpa && (
                <p className="text-gray-600">GPA: {profile.education.gpa}</p>
              )}
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {profile.work && profile.work.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
            <div className="space-y-6">
              {profile.work.map((job, index) => (
                <div key={index} className="border-l-4 border-indigo-600 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800">{job.position}</h3>
                  <p className="text-indigo-600 font-medium">{job.company}</p>
                  <p className="text-gray-500 text-sm mb-2">{job.duration}</p>
                  {job.description && (
                    <p className="text-gray-600 mb-2">{job.description}</p>
                  )}
                  {job.technologies && job.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {profile.projects && profile.projects.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Projects</h2>
            
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by name, description, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {(searchQuery || selectedSkills.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                    title="Clear filters"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Active Filters Display */}
              {selectedSkills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="text-sm text-gray-600 font-medium py-1">Filtering by:</span>
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => handleSkillClick(skill)}
                        className="hover:text-indigo-900"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <>
                <div className="text-sm text-gray-600 mb-4">
                  Showing {filteredProjects.length} of {profile.projects.length} projects
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Achievements Section */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Achievements</h2>
            <ul className="space-y-2">
              {profile.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span className="text-gray-600">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interests Section */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
