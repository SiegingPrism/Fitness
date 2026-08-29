import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_db';
  mongoose.set('bufferCommands', false);
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[Database] MongoDB Connected to: ${mongoUri}`);
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to local MongoDB at ${mongoUri}. Operating in mock data mode for development preview.`);
  }
};
