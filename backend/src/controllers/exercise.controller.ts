import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Exercise } from '../models/Exercise.js';
import { sendSuccess, sendError, ErrorCode } from '../utils/apiResponse.js';
import { EXERCISE_CATALOG_317 } from '../seeds/exerciseCatalogData.js';

export const MASTER_30_EXERCISES = EXERCISE_CATALOG_317;
export const MASTER_CATALOG_EXERCISES = EXERCISE_CATALOG_317;

// In-memory set for favorited exercise IDs
const MOCK_FAVORITE_EXERCISE_IDS = new Set<string>(['ex_1', 'ex_11', 'ex_21']);

export const getExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, movementPattern, difficulty, equipment, muscle, muscles, search, page = 1, limit = 50 } = req.query;

    let exercises = MASTER_30_EXERCISES;

    if (mongoose.connection.readyState === 1) {
      const query: any = { status: { $ne: 'ARCHIVED' } };
      if (category && category !== 'All') query.category = category;
      if (movementPattern) query.movementPattern = movementPattern;
      if (difficulty) query.difficulty = difficulty;
      if (muscle) query.primaryMuscles = muscle;
      if (equipment) query.equipment = new RegExp(String(equipment), 'i');
      if (search) {
        query.$or = [
          { name: new RegExp(String(search), 'i') },
          { aliases: new RegExp(String(search), 'i') },
          { tags: new RegExp(String(search), 'i') },
          { primaryMuscles: new RegExp(String(search), 'i') }
        ];
      }

      const dbExercises = await Exercise.find(query);
      if (dbExercises.length > 0) {
        exercises = dbExercises as any;
      }
    }

    if (category && category !== 'All') {
      exercises = exercises.filter((e) =>
        e.category?.some((c) => c.toLowerCase() === String(category).toLowerCase())
      );
    }

    if (movementPattern && movementPattern !== 'All') {
      const patterns = String(movementPattern).split(',').map((p) => p.trim().toLowerCase());
      exercises = exercises.filter((e) => patterns.includes(e.movementPattern?.toLowerCase() || ''));
    }

    const muscleFilter = (muscles || muscle) as string | undefined;
    if (muscleFilter && muscleFilter !== 'All') {
      const targetMuscles = String(muscleFilter).split(',').map((m) => m.trim().toLowerCase());
      exercises = exercises.filter((e) =>
        e.primaryMuscles?.some((m) => targetMuscles.includes(m.toLowerCase()))
      );
    }

    if (equipment && equipment !== 'All') {
      const targetEquipment = String(equipment).split(',').map((eq) => eq.trim().toLowerCase());
      exercises = exercises.filter((e) =>
        e.equipment?.some((eq) => targetEquipment.some((teq) => eq.toLowerCase().includes(teq)))
      );
    }

    if (difficulty && difficulty !== 'All') {
      const targetDiffs = String(difficulty).split(',').map((d) => d.trim().toLowerCase());
      exercises = exercises.filter((e) => targetDiffs.includes(e.difficulty?.toLowerCase() || ''));
    }

    if (search) {
      const q = String(search).toLowerCase();
      exercises = exercises.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.slug?.toLowerCase().includes(q) ||
          e.primaryMuscles?.some((m) => m.toLowerCase().includes(q)) ||
          e.aliases?.some((a) => a.toLowerCase().includes(q)) ||
          e.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const total = exercises.length;
    const paginated = exercises.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    sendSuccess(res, {
      total,
      page: pageNum,
      limit: limitNum,
      hasMore: pageNum * limitNum < total,
      exercises: paginated
    });
  } catch (err) {
    next(err);
  }
};

export const getPopularExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const popularSlugs = [
      'barbell-bench-press',
      'barbell-back-squat',
      'barbell-deadlift',
      'overhead-press-ohp',
      'lat-pulldown',
      'pull-up'
    ];

    const popular = MASTER_30_EXERCISES.filter((e) => popularSlugs.includes(e.slug));
    sendSuccess(res, popular);
  } catch (err) {
    next(err);
  }
};

export const getFavoriteExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const favorites = MASTER_30_EXERCISES.filter((e) => MOCK_FAVORITE_EXERCISE_IDS.has(e._id) || MOCK_FAVORITE_EXERCISE_IDS.has(e.slug));
    sendSuccess(res, favorites);
  } catch (err) {
    next(err);
  }
};

export const toggleFavoriteExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    let isFavorite = false;

    if (MOCK_FAVORITE_EXERCISE_IDS.has(id)) {
      MOCK_FAVORITE_EXERCISE_IDS.delete(id);
      isFavorite = false;
    } else {
      MOCK_FAVORITE_EXERCISE_IDS.add(id);
      isFavorite = true;
    }

    sendSuccess(res, {
      exerciseId: id,
      isFavorite,
      message: isFavorite ? 'Added to favorites' : 'Removed from favorites'
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const recentSlugs = ['barbell-bench-press', 'incline-dumbbell-bench-press', 'cable-chest-fly', 'cable-rope-triceps-pushdown', 'barbell-deadlift'];
    let recent = MASTER_30_EXERCISES.filter((e) => recentSlugs.includes(e.slug));
    if (recent.length === 0) {
      recent = MASTER_30_EXERCISES.slice(0, 4);
    }
    sendSuccess(res, recent);
  } catch (err) {
    next(err);
  }
};

export const getExerciseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    let exercise = MASTER_30_EXERCISES.find((e) => e._id === id || e.slug === id);

    if (!exercise && mongoose.connection.readyState === 1) {
      const dbExercise = await Exercise.findOne({ $or: [{ _id: mongoose.Types.ObjectId.isValid(id) ? id : null }, { slug: id }] });
      if (dbExercise) exercise = dbExercise as any;
    }

    if (!exercise) {
      sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
      return;
    }

    sendSuccess(res, exercise);
  } catch (err) {
    next(err);
  }
};

export const getExerciseBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    let exercise = MASTER_30_EXERCISES.find((e) => e.slug === slug || e._id === slug);

    if (!exercise && mongoose.connection.readyState === 1) {
      const dbExercise = await Exercise.findOne({ slug });
      if (dbExercise) exercise = dbExercise as any;
    }

    if (!exercise) {
      sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
      return;
    }

    sendSuccess(res, exercise);
  } catch (err) {
    next(err);
  }
};

export const getExerciseAlternatives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const exercise = MASTER_30_EXERCISES.find((e) => e._id === id || e.slug === id) || MASTER_30_EXERCISES[0];

    const alternatives = exercise.alternatives || [];

    sendSuccess(res, {
      originalExerciseId: exercise._id,
      originalExerciseName: exercise.name,
      alternatives
    });
  } catch (err) {
    next(err);
  }
};
