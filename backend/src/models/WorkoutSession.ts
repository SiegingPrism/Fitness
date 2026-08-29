import mongoose, { Schema, Document } from 'mongoose';

export interface ILoggedSet {
  setNumber: number;
  weightKg: number;
  repsCompleted: number;
  rir?: number;
  rpe?: number;
  isCompleted: boolean;
}

export interface IWorkoutSession extends Document {
  athleteId: mongoose.Types.ObjectId;
  programId?: mongoose.Types.ObjectId;
  workoutDayName: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  totalDurationMinutes: number;
  totalVolumeKg: number;
  caloriesBurned?: number;
  prCount?: number;
  completedAt?: Date;
}

const loggedSetSchema = new Schema<ILoggedSet>({
  setNumber: { type: Number, required: true },
  weightKg: { type: Number, required: true },
  repsCompleted: { type: Number, required: true },
  rir: { type: Number, default: 2 },
  rpe: { type: Number, default: 8 },
  isCompleted: { type: Boolean, default: true }
});

const workoutSessionSchema = new Schema<IWorkoutSession>(
  {
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    programId: { type: Schema.Types.ObjectId, ref: 'Program' },
    workoutDayName: { type: String, required: true },
    status: { type: String, enum: ['IN_PROGRESS', 'COMPLETED', 'ABANDONED'], default: 'COMPLETED' },
    totalDurationMinutes: { type: Number, default: 45 },
    totalVolumeKg: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 450 },
    prCount: { type: Number, default: 0 },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

// Compound Index for fast athlete session history queries
workoutSessionSchema.index({ athleteId: 1, completedAt: -1 });

export const WorkoutSession = mongoose.model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);
