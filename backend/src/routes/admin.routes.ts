import { Router, Request, Response, NextFunction } from 'express';
import {
  createExerciseAdmin,
  updateExerciseAdmin,
  archiveExerciseAdmin
} from '../controllers/admin.exercise.controller.js';
import { sendError, ErrorCode } from '../utils/apiResponse.js';

const router = Router();

// Admin Authorization Guard Middleware
export const requireAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const roleHeader = req.headers['x-user-role'] || req.headers['x-admin-role'];

  // Check role header or dev admin mode
  if (roleHeader === 'ADMIN' || roleHeader === 'COACH' || process.env.NODE_ENV === 'development') {
    next();
    return;
  }

  sendError(res, ErrorCode.FORBIDDEN, 'Administrative privileges required for exercise management', 403);
};

router.use(requireAdminRole);

router.post('/exercises', createExerciseAdmin);
router.patch('/exercises/:id', updateExerciseAdmin);
router.delete('/exercises/:id', archiveExerciseAdmin);
router.post('/exercises/:id/archive', archiveExerciseAdmin);

export default router;
