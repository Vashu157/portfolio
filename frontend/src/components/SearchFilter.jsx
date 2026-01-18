import React, { useState } from 'react';

const SearchFilter = ({ onSearch, onClear, skills = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const handleSkillFilter = (skill) => {
    if (skill === selectedSkill) {
      // Deselect if clicking the same skill
      setSelectedSkill('');
      onClear();
    } else {
      setSelectedSkill(skill);
      onSearch(skill);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSelectedSkill('');
    onClear();
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg animate-fade-in">
      <h2 className="text-xl font-bold text-white mb-4">Filter Projects</h2>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by skill or technology..."
            className="flex-1 px-4 py-3 bg-slate-700 text-white placeholder-slate-400 rounded-lg border border-slate-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white rounded-lg transition-all duration-200 hover:scale-105 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {(searchTerm || selectedSkill) && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {/* Quick Skill Filters */}
      {skills && skills.length > 0 && (
        <div>
          <p className="text-sm text-slate-400 mb-3">Quick filter by skill:</p>
          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 8).map((skill, index) => (
              <button
                key={index}
                onClick={() => handleSkillFilter(skill)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedSkill === skill
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
