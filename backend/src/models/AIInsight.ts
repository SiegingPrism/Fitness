import mongoose, { Schema, Document } from 'mongoose';

export interface IAIInsight extends Document {
  athleteId: mongoose.Types.ObjectId;
  workoutSessionId?: mongoose.Types.ObjectId;
  category: 'PROGRESSION' | 'FATIGUE' | 'RECOVERY' | 'RECOMMENDATION';
  summaryText: string;
  evidence: {
    label: string;
    value: string;
  }[];
  recommendationText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AIInsightSchema: Schema = new Schema<IAIInsight>(
  {
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workoutSessionId: { type: Schema.Types.ObjectId, ref: 'WorkoutSession' },
    category: { type: String, enum: ['PROGRESSION', 'FATIGUE', 'RECOVERY', 'RECOMMENDATION'], default: 'PROGRESSION' },
    summaryText: { type: String, required: true },
    evidence: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],
    recommendationText: { type: String }
  },
  { timestamps: true }
);

export const AIInsight = mongoose.model<IAIInsight>('AIInsight', AIInsightSchema);
