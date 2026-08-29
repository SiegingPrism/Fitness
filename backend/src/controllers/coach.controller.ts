import { Request, Response, NextFunction } from 'express';
import { AthleteProfile } from '../models/AthleteProfile.js';
import { isDatabaseConnected } from '../config/database.js';

export const getAssignedAthletes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let roster: any[] = [];

    if (isDatabaseConnected()) {
      roster = await AthleteProfile.find().populate('userId', 'firstName lastName email profilePictureUrl');
    }

    if (!roster || roster.length === 0) {
      roster = [
        {
          id: '1',
          name: 'Rahul Sharma',
          program: 'Push/Pull/Legs • Week 4',
          status: '3 Missed Sessions',
          statusType: 'DANGER',
          compliancePercentage: 87,
          streakDays: 8,
          benchPrKg: 82.5
        },
        {
          id: '2',
          name: 'Sarah Jenkins',
          program: 'Hypertrophy Block • Week 6',
          status: 'Ready for Progression (+5kg)',
          statusType: 'SUCCESS',
          compliancePercentage: 96,
          streakDays: 14,
          benchPrKg: 65.0
        },
        {
          id: '3',
          name: 'Mike Taylor',
          program: 'Powerlifting Split • Week 2',
          status: 'High Volume Fatigue',
          statusType: 'WARNING',
          compliancePercentage: 91,
          streakDays: 5,
          benchPrKg: 110.0
        }
      ];
    }

    res.json({
      success: true,
      data: {
        totalAthletes: 42,
        activePrograms: 37,
        attentionNeededCount: 6,
        athletes: roster
      }
    });
  } catch (error) {
    next(error);
  }
};
