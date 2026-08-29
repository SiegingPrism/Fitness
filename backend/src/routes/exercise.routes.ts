import { Router } from 'express';
import {
  getExercises,
  getExerciseById,
  getExerciseBySlug,
  getExerciseAlternatives
} from '../controllers/exercise.controller.js';

const router = Router();

router.get('/', getExercises);
router.get('/slug/:slug', getExerciseBySlug);
router.get('/:id', getExerciseById);
router.get('/:id/alternatives', getExerciseAlternatives);

export default router;
