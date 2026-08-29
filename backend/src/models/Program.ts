import mongoose, { Schema, Document } from 'mongoose';

export type SetGroupType = 'NORMAL' | 'SUPERSET' | 'GIANT_SET' | 'CIRCUIT';

export interface IPrescribedExercise {
  exerciseId: mongoose.Types.ObjectId;
  exerciseName: string;
  order: number;
  groupId?: string; // Groups exercises in supersets (e.g. 'A', 'B')
  groupType?: SetGroupType;
  targetSets: number;
  targetReps: string;
  targetRIR: number;
  targetRPE?: number;
  restSeconds: number;
  tempo?: string; // e.g. "3-1-1-0"
  notes?: string;
}

export interface IWorkoutDay {
  dayName: string; // e.g. "Day 1 — Push Focus"
  estimatedDurationMinutes?: number;
  focusMuscleGroups?: string[];
  exercises: IPrescribedExercise[];
}

export interface IProgram extends Document {
  title: string;
  description?: string;
  durationWeeks: number;
  targetGoal: 'STRENGTH' | 'HYPERTROPHY' | 'FAT_LOSS' | 'GENERAL_FITNESS' | 'ATHLETIC_PERFORMANCE';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  creatorCoachId: mongoose.Types.ObjectId;
  assignedAthleteIds: mongoose.Types.ObjectId[];
  days: IWorkoutDay[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PrescribedExerciseSchema = new Schema<IPrescribedExercise>({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  exerciseName: { type: String, required: true },
  order: { type: Number, default: 1 },
  groupId: { type: String },
  groupType: { type: String, enum: ['NORMAL', 'SUPERSET', 'GIANT_SET', 'CIRCUIT'], default: 'NORMAL' },
  targetSets: { type: Number, required: true, default: 3 },
  targetReps: { type: String, required: true, default: '8-12' },
  targetRIR: { type: Number, required: true, default: 2 },
  targetRPE: { type: Number, default: 8 },
  restSeconds: { type: Number, required: true, default: 120 },
  tempo: { type: String, default: '3-0-1-0' },
  notes: { type: String }
});

const WorkoutDaySchema = new Schema<IWorkoutDay>({
  dayName: { type: String, required: true },
  estimatedDurationMinutes: { type: Number, default: 60 },
  focusMuscleGroups: { type: [String], default: [] },
  exercises: [PrescribedExerciseSchema]
});

const ProgramSchema: Schema = new Schema<IProgram>(
  {
    title: { type: String, required: true },
    description: { type: String },
    durationWeeks: { type: Number, default: 12 },
    targetGoal: {
      type: String,
      enum: ['STRENGTH', 'HYPERTROPHY', 'FAT_LOSS', 'GENERAL_FITNESS', 'ATHLETIC_PERFORMANCE'],
      default: 'HYPERTROPHY'
    },
    difficulty: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      default: 'INTERMEDIATE'
    },
    creatorCoachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAthleteIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    days: [WorkoutDaySchema],
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

ProgramSchema.index({ creatorCoachId: 1, targetGoal: 1 });

export const Program = mongoose.model<IProgram>('Program', ProgramSchema);
