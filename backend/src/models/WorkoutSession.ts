import mongoose, { Schema, Document } from 'mongoose';

export type SetType =
  | 'NORMAL'
  | 'WARMUP'
  | 'BACKOFF'
  | 'DROPSET'
  | 'AMRAP'
  | 'REST_PAUSE'
  | 'FAILURE';

export interface ILoggedSet {
  setNumber: number;
  setType: SetType;
  exerciseId?: mongoose.Types.ObjectId;
  exerciseName?: string;
  weightKg: number;
  repsCompleted: number;
  targetReps?: string;
  rir?: number;
  rpe?: number;
  tempo?: string;
  isCompleted: boolean;
  restTakenSeconds?: number;
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
  loggedSets: ILoggedSet[];
  notes?: string;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const loggedSetSchema = new Schema<ILoggedSet>({
  setNumber: { type: Number, required: true },
  setType: {
    type: String,
    enum: ['NORMAL', 'WARMUP', 'BACKOFF', 'DROPSET', 'AMRAP', 'REST_PAUSE', 'FAILURE'],
    default: 'NORMAL'
  },
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise' },
  exerciseName: { type: String },
  weightKg: { type: Number, required: true },
  repsCompleted: { type: Number, required: true },
  targetReps: { type: String },
  rir: { type: Number, default: 2 },
  rpe: { type: Number, default: 8 },
  tempo: { type: String },
  isCompleted: { type: Boolean, default: true },
  restTakenSeconds: { type: Number, default: 90 }
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
    loggedSets: { type: [loggedSetSchema], default: [] },
    notes: { type: String },
    completedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

workoutSessionSchema.index({ athleteId: 1, completedAt: -1 });

export const WorkoutSession = mongoose.model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);
