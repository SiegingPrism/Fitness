import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.js';
import { UserRole } from '../models/User.js';

export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access denied: insufficient permissions for this operation',
        error: { code: 'FORBIDDEN' }
      });
      return;
    }
    next();
  };
};
