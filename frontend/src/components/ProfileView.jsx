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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <SkillBadge
                  key={index}
                  skill={skill}
                  rating={profile.rating?.get?.(skill) || profile.rating?.[skill]}
                />
              ))}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
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
