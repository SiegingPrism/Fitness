import mongoose, { Schema, Document } from 'mongoose';

export interface IUserExercisePreference extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: string;
  isFavorite: boolean;
  isDisliked: boolean;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserExercisePreferenceSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    exerciseId: { type: String, required: true, index: true },
    isFavorite: { type: Boolean, default: false },
    isDisliked: { type: Boolean, default: false },
    lastUsedAt: { type: Date }
  },
  { timestamps: true }
);

// Compound index for fast user+exercise preference lookups
UserExercisePreferenceSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });
UserExercisePreferenceSchema.index({ userId: 1, isFavorite: 1 });

export const UserExercisePreference = mongoose.model<IUserExercisePreference>(
  'UserExercisePreference',
  UserExercisePreferenceSchema
);
