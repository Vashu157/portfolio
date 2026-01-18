import Profile from '../models/Profile.js';

/**
 * @desc    Get top skills sorted by frequency or rating
 * @route   GET /api/skills/top
 * @access  Public
 */
export const getTopSkills = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    // If rating map exists, sort by rating
    if (profile.rating && profile.rating.size > 0) {
      const skillsWithRating = profile.skills
        .map(skill => ({
          name: skill,
          rating: profile.rating.get(skill) || 0
        }))
        .sort((a, b) => b.rating - a.rating);

      return res.status(200).json({
        success: true,
        count: skillsWithRating.length,
        data: skillsWithRating
      });
    }

    // Otherwise, calculate frequency from projects
    const skillFrequency = {};
    
    profile.skills.forEach(skill => {
      skillFrequency[skill] = 0;
    });

    // Count skill occurrences in projects
    profile.projects.forEach(project => {
      if (project.technologies && Array.isArray(project.technologies)) {
        project.technologies.forEach(tech => {
          const matchingSkill = profile.skills.find(skill => 
            skill.toLowerCase() === tech.toLowerCase()
          );
          
          if (matchingSkill) {
            skillFrequency[matchingSkill] = (skillFrequency[matchingSkill] || 0) + 1;
          }
        });
      }
    });

    // Count skill occurrences in work experience
    profile.work.forEach(job => {
      if (job.technologies && Array.isArray(job.technologies)) {
        job.technologies.forEach(tech => {
          const matchingSkill = profile.skills.find(skill => 
            skill.toLowerCase() === tech.toLowerCase()
          );
          
          if (matchingSkill) {
            skillFrequency[matchingSkill] = (skillFrequency[matchingSkill] || 0) + 1;
          }
        });
      }
    });

    // Convert to array and sort by frequency
    const sortedSkills = Object.entries(skillFrequency)
      .map(([name, frequency]) => ({ name, frequency }))
      .sort((a, b) => b.frequency - a.frequency);

    res.status(200).json({
      success: true,
      count: sortedSkills.length,
      data: sortedSkills
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all skills
 * @route   GET /api/skills
 * @access  Public
 */
export const getSkills = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      count: profile.skills.length,
      data: profile.skills
    });
  } catch (error) {
    next(error);
  }
};
