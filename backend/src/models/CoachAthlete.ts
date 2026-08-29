import mongoose, { Schema, Document } from 'mongoose';

export type RelationshipStatus = 'pending' | 'active' | 'ended' | 'declined';

export interface ICoachAthlete extends Document {
  coachId: mongoose.Types.ObjectId;
  athleteId: mongoose.Types.ObjectId;
  status: RelationshipStatus;
  invitedBy: mongoose.Types.ObjectId;
  startedAt?: Date;
  endedAt?: Date;
}

const coachAthleteSchema = new Schema<ICoachAthlete>(
  {
    coachId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'active', 'ended', 'declined'], default: 'pending' },
    invitedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date }
  },
  { timestamps: true }
);

// Compound Index for fast coach client roster lookups
coachAthleteSchema.index({ coachId: 1, athleteId: 1 }, { unique: true });
coachAthleteSchema.index({ status: 1 });

export const CoachAthlete = mongoose.model<ICoachAthlete>('CoachAthlete', coachAthleteSchema);
