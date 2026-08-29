import { Router } from 'express';
import {
  getExercises,
  getPopularExercises,
  getFavoriteExercises,
  toggleFavoriteExercise,
  getRecentExercises,
  getExerciseById,
  getExerciseBySlug,
  getExerciseAlternatives
} from '../controllers/exercise.controller.js';

const router = Router();

router.get('/', getExercises);
router.get('/popular', getPopularExercises);
router.get('/favorites', getFavoriteExercises);
router.get('/recent', getRecentExercises);
router.get('/slug/:slug', getExerciseBySlug);
router.post('/:id/favorite', toggleFavoriteExercise);
router.get('/:id', getExerciseById);
router.get('/:id/alternatives', getExerciseAlternatives);

export default router;
