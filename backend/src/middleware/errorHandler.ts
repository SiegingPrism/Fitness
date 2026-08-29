import { Request, Response, NextFunction } from 'express';
import { sendError, ErrorCode } from '../utils/apiResponse.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('[Internal Error Logged]:', err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.code || ErrorCode.INTERNAL_ERROR;
  const message = err.message || 'An unexpected internal server error occurred.';

  sendError(res, errorCode, message, statusCode);
};
