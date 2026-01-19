import express from 'express';
import {
  getHealth,
  getAllProfiles,
  getProfileByUsername,
  createProfile,
  getProfile,
  updateProfile,
  searchProfile
} from '../controllers/profileController.js';
import basicAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/health', getHealth);
router.get('/profiles', getAllProfiles);
router.get('/profiles/:username', getProfileByUsername);
router.post('/profiles', createProfile);
router.get('/search', searchProfile);

// Legacy route for backward compatibility
router.get('/profile', getProfile);

// Protected routes
router.patch('/profiles/:username', basicAuth, updateProfile);

export default router;
