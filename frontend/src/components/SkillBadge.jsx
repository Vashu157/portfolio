import React from 'react';

const SkillBadge = ({ skill, rating, onClick, isActive }) => {
  const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer";
  
  // Different styles based on rating or active state
  const getSkillStyle = () => {
    if (isActive) {
      return "bg-primary-600 text-white shadow-lg shadow-primary-500/50 scale-110 ring-2 ring-primary-400";
    }
    
    if (rating !== undefined) {
      if (rating >= 8) {
        return "bg-emerald-900/50 text-emerald-300 border border-emerald-700 hover:bg-emerald-800 hover:shadow-md hover:scale-105";
      } else if (rating >= 6) {
        return "bg-blue-900/50 text-blue-300 border border-blue-700 hover:bg-blue-800 hover:shadow-md hover:scale-105";
      } else {
        return "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:shadow-md hover:scale-105";
      }
    }
    
    return "bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600 hover:shadow-md hover:scale-105";
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${getSkillStyle()} animate-fade-in`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick && onClick()}
    >
      <div className="flex items-center gap-2">
        <span>{typeof skill === 'object' ? skill.name : skill}</span>
        {rating !== undefined && (
          <span className="text-xs opacity-75">
            {rating}/10
          </span>
        )}
      </div>
    </div>
  );
};

export default SkillBadge;
