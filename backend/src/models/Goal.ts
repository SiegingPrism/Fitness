import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  athleteId: mongoose.Types.ObjectId;
  title: string;
  category: 'STRENGTH' | 'WEIGHT' | 'HABIT';
  targetValue: number;
  currentValue: number;
  unit: string;
  targetDate?: Date;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GoalSchema: Schema = new Schema<IGoal>(
  {
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['STRENGTH', 'WEIGHT', 'HABIT'], default: 'STRENGTH' },
    targetValue: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    targetDate: { type: Date },
    isCompleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Goal = mongoose.model<IGoal>('Goal', GoalSchema);
