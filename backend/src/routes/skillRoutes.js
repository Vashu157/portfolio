import express from 'express';
import { getTopSkills, getSkills } from '../controllers/skillController.js';

const router = express.Router();

// Public routes
router.get('/', getSkills);
router.get('/top', getTopSkills);

export default router;
