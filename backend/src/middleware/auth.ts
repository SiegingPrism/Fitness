import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/User.js';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: UserRole;
    email: string;
  };
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Development fallback mock user
    req.user = {
      userId: '662f1a9b1234567890abcdef',
      role: UserRole.ATHLETE,
      email: 'alex@kinetic.io'
    };
    return next();
  }

  const token = authHeader.split(' ')[1];
  const secret = process.env.JWT_ACCESS_SECRET || 'kinetic_obsidian_access_secret_key_2026';

  try {
    const decoded = jwt.verify(token, secret) as { userId: string; role: UserRole; email: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token',
      error: { code: 'UNAUTHORIZED' }
    });
  }
};
