import mongoose, { Schema, Document } from 'mongoose';

export interface IAIUsage extends Document {
  userId: mongoose.Types.ObjectId;
  billingMonth: string; // e.g. "2026-08"
  promptsUsed: number;
  promptsLimit: number;
  tokensConsumed: number;
  lastUsedAt: Date;
}

const aiUsageSchema = new Schema<IAIUsage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    billingMonth: { type: String, required: true },
    promptsUsed: { type: Number, default: 0 },
    promptsLimit: { type: Number, default: 100 },
    tokensConsumed: { type: Number, default: 0 },
    lastUsedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

aiUsageSchema.index({ userId: 1, billingMonth: 1 }, { unique: true });

export const AIUsage = mongoose.model<IAIUsage>('AIUsage', aiUsageSchema);
