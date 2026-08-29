import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, UserRole } from '../models/User.js';
import { Exercise } from '../models/Exercise.js';
import { Program } from '../models/Program.js';
import { AthleteProfile } from '../models/AthleteProfile.js';
import { CoachProfile } from '../models/CoachProfile.js';
import { WorkoutSession } from '../models/WorkoutSession.js';

dotenv.config();

export const seed = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fitness_db';
  try {
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Exercise.deleteMany({});
    await Program.deleteMany({});
    await AthleteProfile.deleteMany({});
    await CoachProfile.deleteMany({});
    await WorkoutSession.deleteMany({});

    // Seed Master Exercises
    const exercises = await Exercise.insertMany([
      {
        name: 'Barbell Bench Press',
        category: 'Chest',
        primaryMuscleGroup: 'Pectoralis Major',
        secondaryMuscleGroups: ['Triceps Brachii', 'Anterior Deltoid'],
        equipmentRequired: 'Barbell',
        instructions: 'Lie flat on bench, lower bar with controlled tempo to mid-chest, press upwards forcefully.'
      },
      {
        name: 'Incline Dumbbell Press',
        category: 'Chest',
        primaryMuscleGroup: 'Clavicular Chest',
        secondaryMuscleGroups: ['Anterior Deltoid', 'Triceps'],
        equipmentRequired: 'Dumbbells',
        instructions: 'Set bench to 30 degrees incline. Press dumbbells vertically, maintaining stable shoulder retraction.'
      },
      {
        name: 'Barbell Squat',
        category: 'Legs',
        primaryMuscleGroup: 'Quadriceps',
        secondaryMuscleGroups: ['Gluteus Maximus', 'Hamstrings'],
        equipmentRequired: 'Barbell',
        instructions: 'Bar resting across upper trapezius, squat down below parallel while keeping chest high.'
      },
      {
        name: 'Barbell Deadlift',
        category: 'Back',
        primaryMuscleGroup: 'Erector Spinae',
        secondaryMuscleGroups: ['Glutes', 'Hamstrings', 'Latissimus Dorsi'],
        equipmentRequired: 'Barbell',
        instructions: 'Hinge at hips, pull bar tight against shins and lock out at hips.'
      },
      {
        name: 'Lat Pulldown',
        category: 'Back',
        primaryMuscleGroup: 'Latissimus Dorsi',
        secondaryMuscleGroups: ['Biceps Brachii'],
        equipmentRequired: 'Cable Machine',
        instructions: 'Pull bar towards upper chest while pulling shoulder blades down and back.'
      },
      {
        name: 'Overhead Shoulder Press',
        category: 'Shoulders',
        primaryMuscleGroup: 'Anterior Deltoid',
        secondaryMuscleGroups: ['Triceps'],
        equipmentRequired: 'Barbell',
        instructions: 'Press bar vertically overhead from front rack position.'
      }
    ]);

    console.log(`[Seed] Seeded ${exercises.length} master exercises.`);

    // Seed Users
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    const coach = await User.create({
      email: 'coach@kinetic.io',
      passwordHash,
      firstName: 'Dan',
      lastName: 'Miller',
      role: UserRole.COACH,
      isOnboardingCompleted: true
    });

    await CoachProfile.create({
      userId: coach._id,
      bio: 'Head Strength Coach specializing in hypertrophy and powerlifting.',
      specialties: ['Hypertrophy', 'Powerlifting', 'Biomechanics'],
      inviteCode: 'COACH-DAN2026'
    });

    const athlete = await User.create({
      email: 'alex@kinetic.io',
      passwordHash,
      firstName: 'Alex',
      lastName: 'Rivers',
      role: UserRole.ATHLETE,
      isOnboardingCompleted: true
    });

    await AthleteProfile.create({
      userId: athlete._id,
      assignedCoachId: coach._id,
      heightCm: 178,
      weightKg: 76.5,
      primaryGoal: 'Hypertrophy',
      trainingDaysPerWeek: 4,
      streakDays: 12,
      compliancePercentage: 92
    });

    console.log('[Seed] Seeded Coach & Athlete accounts.');

    // Seed Sample Program
    const program = await Program.create({
      title: '12-Week Advanced Hypertrophy Split',
      durationWeeks: 12,
      targetGoal: 'Hypertrophy',
      creatorCoachId: coach._id,
      assignedAthleteIds: [athlete._id],
      days: [
        {
          dayName: 'Day 1 — Push Focus',
          exercises: [
            {
              exerciseId: exercises[0]._id,
              exerciseName: 'Barbell Bench Press',
              targetSets: 3,
              targetReps: '8-12',
              targetRIR: 2,
              targetRPE: 8,
              restSeconds: 120
            },
            {
              exerciseId: exercises[1]._id,
              exerciseName: 'Incline Dumbbell Press',
              targetSets: 3,
              targetReps: '10-12',
              targetRIR: 2,
              targetRPE: 8,
              restSeconds: 90
            }
          ]
        }
      ]
    });

    // Seed Workout Session History
    await WorkoutSession.create({
      athleteId: athlete._id,
      programId: program._id,
      workoutDayName: 'Push Day',
      status: 'COMPLETED',
      totalDurationMinutes: 52,
      totalVolumeKg: 8420,
      exercisesCompletedCount: 6,
      sessionRating: 5,
      notes: 'Bench press felt great today. Kept tight arch and RIR at 2.',
      exercises: [
        {
          exerciseId: exercises[0]._id,
          exerciseName: 'Barbell Bench Press',
          sets: [
            { setNumber: 1, weightKg: 60, repsCompleted: 10, rir: 2, rpe: 8, isCompleted: true },
            { setNumber: 2, weightKg: 60, repsCompleted: 8, rir: 2, rpe: 8, isCompleted: true },
            { setNumber: 3, weightKg: 55, repsCompleted: 8, rir: 1, rpe: 9, isCompleted: true }
          ]
        }
      ]
    });

    console.log('[Seed] Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

if (process.argv[1].includes('seedDatabase')) {
  seed();
}
