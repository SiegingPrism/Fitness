import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  getExerciseAlternatives
} from '../controllers/exercise.controller.js';

const router = Router();

router.get('/', getExercises);
router.get('/slug/:slug', getExerciseById);
router.get('/:id', getExerciseById);
router.get('/:id/alternatives', getExerciseAlternatives);

export default router;
