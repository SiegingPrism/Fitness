import mongoose, { Schema, Document } from 'mongoose';

export type SubscriptionTier = 'ATHLETE_FREE' | 'ATHLETE_PRO' | 'COACH_FREE' | 'COACH_PRO' | 'GYM_BUSINESS';
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled';
export type BillingInterval = 'monthly' | 'yearly';

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  billingInterval: BillingInterval;
  amountCents: number;
  currency: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    tier: {
      type: String,
      enum: ['ATHLETE_FREE', 'ATHLETE_PRO', 'COACH_FREE', 'COACH_PRO', 'GYM_BUSINESS'],
      default: 'ATHLETE_PRO'
    },
    status: {
      type: String,
      enum: ['active', 'trialing', 'past_due', 'canceled'],
      default: 'active'
    },
    billingInterval: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    },
    amountCents: { type: Number, default: 1999 },
    currency: { type: String, default: 'USD' },
    currentPeriodStart: { type: Date, default: Date.now },
    currentPeriodEnd: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    },
    cancelAtPeriodEnd: { type: Boolean, default: false }
  },
  { timestamps: true }
);

subscriptionSchema.index({ userId: 1, status: 1 });

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);
