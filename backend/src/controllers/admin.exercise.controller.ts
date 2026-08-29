import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Exercise, IExercise } from '../models/Exercise.js';
import { MASTER_30_EXERCISES } from './exercise.controller.js';
import { sendSuccess, sendError, ErrorCode } from '../utils/apiResponse.js';

export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

// Validate required fields for ACTIVE status publication
export const validateActiveExercise = (data: Partial<IExercise>): string[] => {
  const errors: string[] = [];
  if (!data.name || data.name.trim().length === 0) errors.push('Name is required');
  if (!data.primaryMuscles || data.primaryMuscles.length === 0) errors.push('At least one primary muscle is required');
  if (!data.movementPattern) errors.push('Movement pattern is required');
  if (!data.equipment || data.equipment.length === 0) errors.push('At least one equipment item is required');
  if (!data.difficulty) errors.push('Difficulty level is required');
  if (!data.instructions || data.instructions.length === 0) errors.push('Step-by-step instructions are required');
  return errors;
};

// POST /api/v1/admin/exercises
export const createExerciseAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payload = req.body;

    if (!payload.name) {
      sendError(res, ErrorCode.VALIDATION_ERROR, 'Exercise name is required', 400);
      return;
    }

    let slug = payload.slug ? slugify(payload.slug) : slugify(payload.name);
    const status = payload.status || 'DRAFT';

    // If status is ACTIVE, enforce production publication rules
    if (status === 'ACTIVE') {
      const validationErrors = validateActiveExercise(payload);
      if (validationErrors.length > 0) {
        sendError(res, ErrorCode.VALIDATION_ERROR, `Cannot publish ACTIVE exercise: ${validationErrors.join(', ')}`, 400);
        return;
      }
    }

    if (mongoose.connection.readyState === 1) {
      // Check for duplicate slug and resolve collision deterministically
      let existingSlug = await Exercise.findOne({ slug });
      let counter = 1;
      while (existingSlug) {
        slug = `${slugify(payload.name)}-${counter}`;
        existingSlug = await Exercise.findOne({ slug });
        counter++;
      }

      const exercise = new Exercise({
        ...payload,
        slug,
        status
      });
      await exercise.save();
      sendSuccess(res, exercise, 201);
      return;
    }

    // In-memory fallback
    const newExercise = {
      _id: `ex_${Date.now()}`,
      ...payload,
      slug,
      status,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    MASTER_30_EXERCISES.push(newExercise as any);
    sendSuccess(res, newExercise, 201);
  } catch (err) {
    next(err);
  }
};

// PATCH /api/v1/admin/exercises/:id
export const updateExerciseAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }

    if (updates.status === 'ACTIVE') {
      const validationErrors = validateActiveExercise(updates);
      if (validationErrors.length > 0) {
        sendError(res, ErrorCode.VALIDATION_ERROR, `Cannot publish ACTIVE exercise: ${validationErrors.join(', ')}`, 400);
        return;
      }
    }

    if (mongoose.connection.readyState === 1) {
      const exercise = await Exercise.findOneAndUpdate(
        { $or: [{ _id: mongoose.Types.ObjectId.isValid(id) ? id : null }, { slug: id }] },
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!exercise) {
        sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
        return;
      }

      sendSuccess(res, exercise);
      return;
    }

    // In-memory fallback
    const idx = MASTER_30_EXERCISES.findIndex((e) => e._id === id || e.slug === id);
    if (idx >= 0) {
      MASTER_30_EXERCISES[idx] = { ...MASTER_30_EXERCISES[idx], ...updates, updatedAt: new Date() };
      sendSuccess(res, MASTER_30_EXERCISES[idx]);
      return;
    }

    sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
  } catch (err) {
    next(err);
  }
};

// DELETE or POST /api/v1/admin/exercises/:id/archive (Soft Archive)
export const archiveExerciseAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (mongoose.connection.readyState === 1) {
      const exercise = await Exercise.findOneAndUpdate(
        { $or: [{ _id: mongoose.Types.ObjectId.isValid(id) ? id : null }, { slug: id }] },
        { $set: { status: 'ARCHIVED' } },
        { new: true }
      );

      if (!exercise) {
        sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
        return;
      }

      sendSuccess(res, {
        message: 'Exercise archived successfully. Historical workout logs preserved.',
        exerciseId: exercise._id,
        status: exercise.status
      });
      return;
    }

    // In-memory fallback
    const idx = MASTER_30_EXERCISES.findIndex((e) => e._id === id || e.slug === id);
    if (idx >= 0) {
      MASTER_30_EXERCISES[idx].status = 'ARCHIVED';
      sendSuccess(res, {
        message: 'Exercise archived successfully (in-memory). Historical workout logs preserved.',
        exerciseId: MASTER_30_EXERCISES[idx]._id,
        status: 'ARCHIVED'
      });
      return;
    }

    sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
  } catch (err) {
    next(err);
  }
};
