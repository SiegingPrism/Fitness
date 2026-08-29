import mongoose, { Schema, Document } from 'mongoose';

export type ExerciseCategory =
  | 'STRENGTH'
  | 'HYPERTROPHY'
  | 'CONDITIONING'
  | 'MOBILITY'
  | 'REHABILITATION'
  | 'SKILL';

export type MovementPattern =
  | 'HORIZONTAL_PUSH'
  | 'VERTICAL_PUSH'
  | 'HORIZONTAL_PULL'
  | 'VERTICAL_PULL'
  | 'SQUAT'
  | 'HINGE'
  | 'LUNGE'
  | 'CARRY'
  | 'ROTATION'
  | 'ANTI_ROTATION'
  | 'FLEXION'
  | 'EXTENSION'
  | 'ISOLATION';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export type ExerciseStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface IExerciseAlternative {
  exerciseId: string;
  name: string;
  equipment: string;
  similarityScore: number; // 0-100
  similarityDescription?: string;
}

export interface IExercise extends Document {
  name: string;
  slug: string;
  description: string;
  category: ExerciseCategory[];
  movementPattern: MovementPattern;
  difficulty: DifficultyLevel;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  requiredEquipment: string[];
  bodyParts?: string[];
  joints?: string[];
  instructions: string[];
  setupInstructions?: string[];
  breathingInstructions?: string[];
  coachingCues: string[];
  commonMistakes: string[];
  progressionMethods?: string[];
  regressionMethods?: string[];
  aliases: string[];
  tags: string[];
  media: {
    thumbnail?: string;
    images?: string[];
    videos?: { url: string; duration?: number }[];
  };
  programming: {
    recommendedSets: string;
    recommendedRepRange: { min: number; max: number };
    recommendedRestSeconds: number;
    recommendedRPE: number;
    recommendedRIR: number;
    tempo?: string;
  };
  alternatives: IExerciseAlternative[];
  status: ExerciseStatus;
  personalBest?: {
    weightKg: number;
    reps: number;
    estimated1RM: number;
    totalVolumeKg: number;
    achievedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: [String],
      enum: ['STRENGTH', 'HYPERTROPHY', 'CONDITIONING', 'MOBILITY', 'REHABILITATION', 'SKILL'],
      default: ['STRENGTH', 'HYPERTROPHY'],
      index: true
    },
    movementPattern: {
      type: String,
      enum: [
        'HORIZONTAL_PUSH',
        'VERTICAL_PUSH',
        'HORIZONTAL_PULL',
        'VERTICAL_PULL',
        'SQUAT',
        'HINGE',
        'LUNGE',
        'CARRY',
        'ROTATION',
        'ANTI_ROTATION',
        'FLEXION',
        'EXTENSION',
        'ISOLATION'
      ],
      required: true,
      index: true
    },
    difficulty: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      default: 'INTERMEDIATE',
      index: true
    },
    primaryMuscles: { type: [String], required: true, index: true },
    secondaryMuscles: { type: [String], default: [] },
    equipment: { type: [String], required: true, index: true },
    requiredEquipment: { type: [String], default: [] },
    bodyParts: { type: [String], default: [] },
    joints: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    setupInstructions: { type: [String], default: [] },
    breathingInstructions: { type: [String], default: [] },
    coachingCues: { type: [String], default: [] },
    commonMistakes: { type: [String], default: [] },
    progressionMethods: { type: [String], default: [] },
    regressionMethods: { type: [String], default: [] },
    aliases: { type: [String], default: [], index: true },
    tags: { type: [String], default: [], index: true },
    media: {
      thumbnail: { type: String },
      images: { type: [String], default: [] },
      videos: [{ url: String, duration: Number }]
    },
    programming: {
      recommendedSets: { type: String, default: '3-4' },
      recommendedRepRange: {
        min: { type: Number, default: 8 },
        max: { type: Number, default: 12 }
      },
      recommendedRestSeconds: { type: Number, default: 90 },
      recommendedRPE: { type: Number, default: 8 },
      recommendedRIR: { type: Number, default: 2 },
      tempo: { type: String, default: '3-0-1-0' }
    },
    alternatives: [
      {
        exerciseId: { type: String, required: true },
        name: { type: String, required: true },
        equipment: { type: String, default: '' },
        similarityScore: { type: Number, default: 85 },
        similarityDescription: { type: String }
      }
    ],
    status: {
      type: String,
      enum: ['DRAFT', 'ACTIVE', 'ARCHIVED'],
      default: 'ACTIVE',
      index: true
    },
    personalBest: {
      weightKg: { type: Number, default: 0 },
      reps: { type: Number, default: 0 },
      estimated1RM: { type: Number, default: 0 },
      totalVolumeKg: { type: Number, default: 0 },
      achievedAt: { type: Date, default: Date.now }
    }
  },
  { timestamps: true }
);

// Compound and search indexes
exerciseSchema.index({ status: 1, category: 1, movementPattern: 1 });
exerciseSchema.index({ primaryMuscles: 1, equipment: 1 });

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
