import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ATHLETE = 'ATHLETE',
  COACH = 'COACH',
  ADMIN = 'ADMIN'
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isOnboardingCompleted: boolean;
  profilePictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.ATHLETE },
    isOnboardingCompleted: { type: Boolean, default: false },
    profilePictureUrl: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', UserSchema);
