import mongoose, { Schema, Document } from 'mongoose';

export type MovementPattern =
  | 'Horizontal Push'
  | 'Vertical Push'
  | 'Horizontal Pull'
  | 'Vertical Pull'
  | 'Squat'
  | 'Hinge'
  | 'Lunge'
  | 'Carry'
  | 'Rotation'
  | 'Isolation';

export type DifficultyLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface IExercise extends Document {
  name: string;
  category: string; // e.g. "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"
  movementPattern: MovementPattern;
  difficulty: DifficultyLevel;
  primaryMuscleGroup: string;
  secondaryMuscleGroups: string[];
  equipmentRequired: string;
  optionalEquipment?: string[];
  setup?: string;
  executionSteps: string[];
  coachingCues: string[];
  commonMistakes: string[];
  recommendedSets: string;
  recommendedReps: string;
  restSeconds: number;
  progressionMethod: string;
  imageUrl?: string;
  videoUrl?: string;
  alternativeExerciseIds?: mongoose.Types.ObjectId[];
  personalBest?: {
    weightKg: number;
    reps: number;
    estimated1RM: number;
    totalVolumeKg: number;
    achievedAt: Date;
  };
}

const exerciseSchema = new Schema<IExercise>(
  {
    name: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    movementPattern: {
      type: String,
      enum: [
        'Horizontal Push',
        'Vertical Push',
        'Horizontal Pull',
        'Vertical Pull',
        'Squat',
        'Hinge',
        'Lunge',
        'Carry',
        'Rotation',
        'Isolation'
      ],
      default: 'Horizontal Push'
    },
    difficulty: {
      type: String,
      enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'],
      default: 'INTERMEDIATE'
    },
    primaryMuscleGroup: { type: String, required: true, index: true },
    secondaryMuscleGroups: { type: [String], default: [] },
    equipmentRequired: { type: String, required: true, index: true },
    optionalEquipment: { type: [String], default: [] },
    setup: { type: String },
    executionSteps: { type: [String], default: [] },
    coachingCues: { type: [String], default: [] },
    commonMistakes: { type: [String], default: [] },
    recommendedSets: { type: String, default: '3-4' },
    recommendedReps: { type: String, default: '8-12' },
    restSeconds: { type: Number, default: 90 },
    progressionMethod: { type: String, default: 'Linear Progressive Overload (+2.5kg when hitting top reps)' },
    imageUrl: { type: String },
    videoUrl: { type: String },
    alternativeExerciseIds: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    personalBest: {
      weightKg: { type: Number, default: 100 },
      reps: { type: Number, default: 5 },
      estimated1RM: { type: Number, default: 116 },
      totalVolumeKg: { type: Number, default: 42380 },
      achievedAt: { type: Date, default: Date.now }
    }
  },
  { timestamps: true }
);

exerciseSchema.index({ category: 1, movementPattern: 1, equipmentRequired: 1 });

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
