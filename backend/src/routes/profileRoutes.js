import express from 'express';
import {
  getHealth,
  getProfile,
  updateProfile,
  searchProfile
} from '../controllers/profileController.js';
import basicAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/health', getHealth);
router.get('/profile', getProfile);
router.get('/search', searchProfile);

// Protected routes
router.patch('/profile', basicAuth, updateProfile);

export default router;
