import { Request, Response, NextFunction } from 'express';
import { Program } from '../models/Program.js';

export const getPrograms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const programs = await Program.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: programs
    });
  } catch (error) {
    next(error);
  }
};

export const createProgram = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, durationWeeks, targetGoal, days } = req.body;
    const program = await Program.create({
      title,
      durationWeeks: durationWeeks || 12,
      targetGoal: targetGoal || 'Hypertrophy',
      creatorCoachId: (req as any).user?.userId || '662f1a9b1234567890abcdef',
      days: days || []
    });

    res.status(201).json({
      success: true,
      data: program
    });
  } catch (error) {
    next(error);
  }
};
