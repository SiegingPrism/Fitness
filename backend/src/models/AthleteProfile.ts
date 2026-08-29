import mongoose, { Schema, Document } from 'mongoose';

export enum ExperienceLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface IAthleteProfile extends Document {
  userId: mongoose.Types.ObjectId;
  assignedCoachId?: mongoose.Types.ObjectId;
  heightCm: number;
  weightKg: number;
  experienceLevel: ExperienceLevel;
  primaryGoal: string;
  trainingDaysPerWeek: number;
  equipmentAccess: string[];
  streakDays: number;
  compliancePercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const AthleteProfileSchema: Schema = new Schema<IAthleteProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    assignedCoachId: { type: Schema.Types.ObjectId, ref: 'User' },
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
    experienceLevel: { type: String, enum: Object.values(ExperienceLevel), default: ExperienceLevel.INTERMEDIATE },
    primaryGoal: { type: String, default: 'Hypertrophy' },
    trainingDaysPerWeek: { type: Number, default: 4 },
    equipmentAccess: [{ type: String }],
    streakDays: { type: Number, default: 0 },
    compliancePercentage: { type: Number, default: 100 }
  },
  { timestamps: true }
);

export const AthleteProfile = mongoose.model<IAthleteProfile>('AthleteProfile', AthleteProfileSchema);
