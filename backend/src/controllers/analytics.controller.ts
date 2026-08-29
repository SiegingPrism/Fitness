import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { WorkoutSession } from '../models/WorkoutSession.js';

export const getProgressAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let sessions: any[] = [];
    if (mongoose.connection.readyState === 1) {
      sessions = await WorkoutSession.find().sort({ completedAt: -1 }).limit(30);
    }

    const trendPoints = [
      { week: 'W1', val: 65.0, est1RM: 75.8 },
      { week: 'W2', val: 70.0, est1RM: 78.2 },
      { week: 'W3', val: 75.0, est1RM: 80.5 },
      { week: 'W4', val: 78.0, est1RM: 81.6 },
      { week: 'W5', val: 82.5, est1RM: 82.5 }
    ];

    let totalVolumeKg = 34200;
    if (sessions.length > 0) {
      totalVolumeKg = sessions.reduce((acc, sess) => acc + (sess.totalVolumeKg || 0), 0);
    }

    res.status(200).json({
      success: true,
      data: {
        benchPress1RM: 82.5,
        percentIncrease: 10.5,
        monthlyVolumeKg: totalVolumeKg,
        activeStreakDays: 15,
        daysActiveWeekly: '5/7',
        trendPoints,
        bodyMetrics: {
          weightKg: 76.5,
          weightGainKg: 1.2,
          caloriesBurnedMonthly: 12400,
          restingHeartRateBpm: 58
        }
      }
    });
  } catch (err) {
    next(err);
  }
};
