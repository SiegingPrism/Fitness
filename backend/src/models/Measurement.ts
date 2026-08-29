import mongoose, { Schema, Document } from 'mongoose';

export interface IMeasurement extends Document {
  athleteId: mongoose.Types.ObjectId;
  date: Date;
  weightKg: number;
  bodyFatPercentage?: number;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  createdAt: Date;
  updatedAt: Date;
}

const MeasurementSchema: Schema = new Schema<IMeasurement>(
  {
    athleteId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    weightKg: { type: Number, required: true },
    bodyFatPercentage: { type: Number },
    chestCm: { type: Number },
    waistCm: { type: Number },
    hipsCm: { type: Number }
  },
  { timestamps: true }
);

export const Measurement = mongoose.model<IMeasurement>('Measurement', MeasurementSchema);
