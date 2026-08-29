import { Response } from 'express';

export enum ErrorCode {
  AUTH_REQUIRED = 'AUTH_REQUIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  FORBIDDEN = 'FORBIDDEN',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ATHLETE_NOT_FOUND = 'ATHLETE_NOT_FOUND',
  COACH_NOT_FOUND = 'COACH_NOT_FOUND',
  PROGRAM_NOT_FOUND = 'PROGRAM_NOT_FOUND',
  WORKOUT_NOT_FOUND = 'WORKOUT_NOT_FOUND',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  RATE_LIMITED = 'RATE_LIMITED',
  INTERNAL_ERROR = 'INTERNAL_ERROR'
}

export const sendSuccess = (res: Response, data: any, statusCode: number = 200, message?: string): void => {
  res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    data
  });
};

export const sendError = (res: Response, code: ErrorCode, message: string, statusCode: number = 400): void => {
  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message
    }
  });
};
