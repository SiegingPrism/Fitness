import { Router } from 'express';
import { getWorkoutHistory, createWorkoutSession } from '../controllers/workout.controller.js';

const router = Router();

router.get('/sessions', getWorkoutHistory);
router.post('/sessions', createWorkoutSession);

export default router;
