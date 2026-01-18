import express from 'express';
import {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import basicAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected routes
router.post('/', basicAuth, addProject);
router.patch('/:id', basicAuth, updateProject);
router.delete('/:id', basicAuth, deleteProject);

export default router;
