import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { LoadingSpinner, ErrorMessage } from './LoadingSpinner';

const AllProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  const fetchAllProfiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.getAllProfiles();
      setProfiles(response.data || []);
    } catch (err) {
      console.error('Error fetching profiles:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load profiles. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Candidates</h1>
          <p className="text-gray-600">
            Browse through {profiles.length} talented developers
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, username, title, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Profiles Grid */}
        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              {searchTerm
                ? 'No profiles found matching your search.'
                : 'No profiles available yet. Be the first to create one!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <Link
                key={profile._id}
                to={`/user/${profile.username}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {profile.name}
                    </h2>
                    <p className="text-indigo-600 font-medium">@{profile.username}</p>
                    {profile.title && (
                      <p className="text-gray-600 text-sm mt-1">{profile.title}</p>
                    )}
                  </div>

                  {/* Bio Preview */}
                  {profile.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {profile.bio}
                    </p>
                  )}

                  {/* Skills Preview */}
                  {profile.skills && profile.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.slice(0, 5).map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {profile.skills.length > 5 && (
                          <span className="text-xs text-gray-500 px-2 py-1">
                            +{profile.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {profile.links?.github && (
                      <a
                        href={profile.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                    {profile.links?.linkedin && (
                      <a
                        href={profile.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-blue-700"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {profile.links?.email && (
                      <a
                        href={`mailto:${profile.links.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </a>
                    )}
                  </div>

                  {/* View Profile Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-indigo-600 font-medium text-sm hover:text-indigo-700">
                      View Full Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProfiles;
