import Profile from '../models/Profile.js';

/**
 * @desc    Get projects, optionally filtered by skill/technology
 * @route   GET /api/projects?skill=python
 * @access  Public
 */
export const getProjects = async (req, res, next) => {
  try {
    const { skill } = req.query;
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    let projects = profile.projects;

    // Filter projects by skill if provided
    if (skill) {
      const skillLower = skill.toLowerCase().trim();
      
      // Filter projects that have the skill in their technologies array
      // OR if the skill is in the profile's skills array and referenced in project
      projects = projects.filter(project => {
        if (project.technologies && Array.isArray(project.technologies)) {
          return project.technologies.some(tech => 
            tech.toLowerCase().includes(skillLower)
          );
        }
        return false;
      });

      // Alternative: Also check if skill exists in profile skills
      // and return projects that match
      if (projects.length === 0) {
        const hasSkill = profile.skills.some(s => 
          s.toLowerCase().includes(skillLower)
        );
        
        if (!hasSkill) {
          return res.status(200).json({
            success: true,
            message: `No projects found for skill: ${skill}`,
            data: [],
            query: { skill }
          });
        }
      }
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
      ...(skill && { query: { skill } })
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single project by ID
 * @route   GET /api/projects/:id
 * @access  Public
 */
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    const project = profile.projects.id(id);
    
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new project
 * @route   POST /api/projects
 * @access  Protected (Basic Auth)
 */
export const addProject = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    profile.projects.push(req.body);
    await profile.save();

    const newProject = profile.projects[profile.projects.length - 1];

    res.status(201).json({
      success: true,
      message: 'Project added successfully',
      data: newProject
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a project
 * @route   PATCH /api/projects/:id
 * @access  Protected (Basic Auth)
 */
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    const project = profile.projects.id(id);
    
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      return next(error);
    }

    // Update project fields
    Object.assign(project, req.body);
    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Protected (Basic Auth)
 */
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const profile = await Profile.findOne();
    
    if (!profile) {
      const error = new Error('Profile not found');
      error.statusCode = 404;
      return next(error);
    }

    const project = profile.projects.id(id);
    
    if (!project) {
      const error = new Error('Project not found');
      error.statusCode = 404;
      return next(error);
    }

    project.deleteOne();
    await profile.save();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
