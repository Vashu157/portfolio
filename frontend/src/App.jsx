import { useState, useEffect } from 'react';
import api from './services/api';
import ProfileHeader from './components/ProfileHeader';
import SkillBadge from './components/SkillBadge';
import ProjectCard from './components/ProjectCard';
import SearchFilter from './components/SearchFilter';
import { EditProfileModal } from './components/Modal';
import { LoadingSpinner, ErrorMessage } from './components/LoadingSpinner';
import './App.css';

function App() {
  // State management
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch profile and projects in parallel
      const [profileResponse, projectsResponse, skillsResponse] = await Promise.all([
        api.getProfile(),
        api.getProjects(),
        api.getTopSkills()
      ]);

      setProfile(profileResponse.data);
      setProjects(projectsResponse.data || []);
      setTopSkills(skillsResponse.data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.response?.data?.message || 'Failed to load portfolio data. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (skill) => {
    setLoading(true);
    setError(null);
    setCurrentFilter(skill);
    
    try {
      const response = await api.getProjects(skill);
      setProjects(response.data || []);
      setFilterActive(true);
    } catch (err) {
      console.error('Error filtering projects:', err);
      setError(err.response?.data?.message || 'Failed to filter projects');
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = async () => {
    setCurrentFilter('');
    setFilterActive(false);
    setLoading(true);
    
    try {
      const response = await api.getProjects();
      setProjects(response.data || []);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError(err.response?.data?.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  // Handle profile update
  const handleProfileUpdate = async (profileData, credentials) => {
    try {
      const response = await api.updateProfile(profileData, credentials);
      setProfile(response.data);
      return response;
    } catch (err) {
      throw err;
    }
  };

  // Show loading state
  if (loading && !profile) {
    return <LoadingSpinner />;
  }

  // Show error state
  if (error && !profile) {
    return <ErrorMessage message={error} onRetry={fetchPortfolioData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with Admin Button */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-slate-900/80 border-b border-slate-700 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {profile?.name?.charAt(0) || 'P'}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">Portfolio</h1>
            </div>
            
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200 flex items-center gap-2 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Header Section */}
        <section>
          <ProfileHeader profile={profile} />
        </section>

        {/* Skills Section */}
        {profile?.skills && profile.skills.length > 0 && (
          <section className="animate-fade-in">
            <div className="bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Skills & Technologies
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {topSkills.length > 0 ? (
                  // Show skills with ratings if available
                  topSkills.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      skill={skill.name}
                      rating={skill.rating || skill.frequency}
                      onClick={() => handleSearch(skill.name)}
                      isActive={currentFilter === skill.name}
                    />
                  ))
                ) : (
                  // Fallback to regular skills
                  profile.skills.map((skill, index) => (
                    <SkillBadge
                      key={index}
                      skill={skill}
                      onClick={() => handleSearch(skill)}
                      isActive={currentFilter === skill}
                    />
                  ))
                )}
              </div>
            </div>
          </section>
        )}

        {/* Search/Filter Section */}
        <section className="animate-fade-in">
          <SearchFilter
            onSearch={handleSearch}
            onClear={handleClearFilter}
            skills={profile?.skills || []}
          />
        </section>

        {/* Filter Status */}
        {filterActive && (
          <div className="animate-fade-in">
            <div className="bg-primary-900/30 border border-primary-700 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filtered by: <strong>{currentFilter}</strong></span>
                <span className="text-primary-400">({projects.length} {projects.length === 1 ? 'project' : 'projects'})</span>
              </div>
              <button
                onClick={handleClearFilter}
                className="text-primary-400 hover:text-primary-300 transition-colors"
              >
                Clear filter
              </button>
            </div>
          </div>
        )}

        {/* Projects Section */}
        <section className="animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
              <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Projects
            </h2>
            <p className="text-slate-400">
              {filterActive 
                ? `Showing projects that use ${currentFilter}` 
                : 'Explore my recent work and side projects'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-500"></div>
              <p className="mt-4 text-slate-300">Loading projects...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-12 text-center">
              <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Projects Found</h3>
              <p className="text-slate-400">
                {filterActive 
                  ? `No projects found for "${currentFilter}". Try a different skill.` 
                  : 'No projects available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={project._id || index} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* Work Experience Section */}
        {profile?.work && profile.work.length > 0 && (
          <section className="animate-fade-in">
            <div className="bg-slate-800 rounded-xl p-6 md:p-8 border border-slate-700 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-7 h-7 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Work Experience
              </h2>
              
              <div className="space-y-6">
                {profile.work.map((job, index) => (
                  <div key={index} className="border-l-4 border-primary-500 pl-6 py-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white">{job.position}</h3>
                      <span className="text-sm text-slate-400">{job.duration}</span>
                    </div>
                    <p className="text-primary-400 font-medium mb-2">{job.company}</p>
                    {job.description && (
                      <p className="text-slate-300 mb-3">{job.description}</p>
                    )}
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600"
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
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">
            © 2026 {profile?.name || 'Portfolio'}. Built with React & Tailwind CSS.
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Powered by Node.js, Express & MongoDB
          </p>
        </div>
      </footer>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onSave={handleProfileUpdate}
      />
    </div>
  );
}

export default App;
