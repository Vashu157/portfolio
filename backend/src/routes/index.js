import profileRoutes from './profileRoutes.js';
import projectRoutes from './projectRoutes.js';
import skillRoutes from './skillRoutes.js';

/**
 * Configure all API routes
 */
const configureRoutes = (app) => {
  // Health check route
  app.get('/api/health', profileRoutes);
  
  // Main routes
  app.use('/api', profileRoutes);
  app.use('/api/projects', projectRoutes);
  app.use('/api/skills', skillRoutes);
  
  // Root route
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Portfolio API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        profile: '/api/profile',
        projects: '/api/projects',
        search: '/api/search',
        skills: '/api/skills',
        topSkills: '/api/skills/top'
      }
    });
  });
};

export default configureRoutes;
