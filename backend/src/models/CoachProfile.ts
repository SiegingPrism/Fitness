import mongoose, { Schema, Document } from 'mongoose';

export interface ICoachProfile extends Document {
  userId: mongoose.Types.ObjectId;
  bio: string;
  specialties: string[];
  certifications: string[];
  maxClients: number;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const CoachProfileSchema: Schema = new Schema<ICoachProfile>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, default: 'Head Strength & Hypertrophy Coach' },
    specialties: [{ type: String }],
    certifications: [{ type: String }],
    maxClients: { type: Number, default: 50 },
    inviteCode: { type: String, required: true, unique: true }
  },
  { timestamps: true }
);

export const CoachProfile = mongoose.model<ICoachProfile>('CoachProfile', CoachProfileSchema);
