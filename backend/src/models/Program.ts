import mongoose, { Schema, Document } from 'mongoose';

export interface IPrescribedExercise {
  exerciseId: mongoose.Types.ObjectId;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  targetRIR: number;
  targetRPE?: number;
  restSeconds: number;
}

export interface IWorkoutDay {
  dayName: string; // e.g. "Day 1 — Push Focus"
  exercises: IPrescribedExercise[];
}

export interface IProgram extends Document {
  title: string;
  durationWeeks: number;
  targetGoal: string;
  creatorCoachId: mongoose.Types.ObjectId;
  assignedAthleteIds: mongoose.Types.ObjectId[];
  days: IWorkoutDay[];
  createdAt: Date;
  updatedAt: Date;
}

const PrescribedExerciseSchema = new Schema<IPrescribedExercise>({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  exerciseName: { type: String, required: true },
  targetSets: { type: Number, required: true, default: 3 },
  targetReps: { type: String, required: true, default: '8-12' },
  targetRIR: { type: Number, required: true, default: 2 },
  targetRPE: { type: Number, default: 8 },
  restSeconds: { type: Number, required: true, default: 120 }
});

const WorkoutDaySchema = new Schema<IWorkoutDay>({
  dayName: { type: String, required: true },
  exercises: [PrescribedExerciseSchema]
});

const ProgramSchema: Schema = new Schema<IProgram>(
  {
    title: { type: String, required: true },
    durationWeeks: { type: Number, default: 12 },
    targetGoal: { type: String, default: 'Hypertrophy' },
    creatorCoachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedAthleteIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    days: [WorkoutDaySchema]
  },
  { timestamps: true }
);

export const Program = mongoose.model<IProgram>('Program', ProgramSchema);
