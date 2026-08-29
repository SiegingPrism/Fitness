import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Exercise } from '../models/Exercise.js';
import { sendSuccess, sendError, ErrorCode } from '../utils/apiResponse.js';

export const MASTER_EXERCISE_CATALOG = [
  {
    _id: 'ex_1',
    name: 'Barbell Bench Press',
    category: 'Chest',
    movementPattern: 'Horizontal Push',
    difficulty: 'INTERMEDIATE',
    primaryMuscleGroup: 'Pectoralis Major',
    secondaryMuscleGroups: ['Triceps Brachii', 'Anterior Deltoid'],
    equipmentRequired: 'Barbell & Bench',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    setup: 'Lie flat on bench with eyes directly under the bar. Retract scapulae and plant feet firmly on the floor.',
    executionSteps: [
      'Unrack barbell with locked arms over chest',
      'Inhale and lower bar with controlled 3-second tempo to sternum',
      'Lightly touch chest without bouncing',
      'Drive forcefully upwards, pressing slightly back toward face'
    ],
    coachingCues: [
      'Keep shoulder blades tightly pinched together throughout',
      'Maintain active leg drive through heels',
      'Control eccentric phase; do not bounce the bar off ribs'
    ],
    commonMistakes: [
      'Excessive lower back arch beyond natural curvature',
      'Flaring elbows out at 90 degrees (keep at 45–60 degrees)',
      'Losing upper back tension at the bottom of the movement'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '6-8 reps',
    restSeconds: 120,
    progressionMethod: 'Add +2.5kg when completing all sets at target reps',
    personalBest: {
      weightKg: 100,
      reps: 5,
      estimated1RM: 116,
      totalVolumeKg: 42380,
      achievedAt: new Date()
    },
    alternatives: [
      { id: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'Dumbbells & Bench', similarity: '95%' },
      { id: 'ex_3', name: 'Incline Dumbbell Press', equipment: 'Dumbbells & Incline Bench', similarity: '90%' },
      { id: 'ex_4', name: 'Machine Chest Press', equipment: 'Plate-Loaded Machine', similarity: '85%' },
      { id: 'ex_5', name: 'Push-Ups (Weighted)', equipment: 'Bodyweight / Plates', similarity: '80%' }
    ]
  },
  {
    _id: 'ex_2',
    name: 'Dumbbell Bench Press',
    category: 'Chest',
    movementPattern: 'Horizontal Push',
    difficulty: 'BEGINNER',
    primaryMuscleGroup: 'Pectoralis Major',
    secondaryMuscleGroups: ['Anterior Deltoid', 'Triceps'],
    equipmentRequired: 'Dumbbells & Bench',
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    setup: 'Sit on edge of flat bench with dumbbells resting on thighs. Kick back smoothly into position.',
    executionSteps: [
      'Position dumbbells at chest level with neutral or 45-degree grip',
      'Press dumbbells upward until arms are extended above chest',
      'Lower weights under control until chest receives a deep stretch'
    ],
    coachingCues: [
      'Feel deep stretch at the bottom without over-extending shoulders',
      'Squeeze chest at the top of contraction'
    ],
    commonMistakes: [
      'Clanking dumbbells together at the top',
      'Dropping elbows below bench level causing anterior shoulder strain'
    ],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-12 reps',
    restSeconds: 90,
    progressionMethod: 'Increase dumbbell weight by +2kg when hitting 12 reps',
    personalBest: {
      weightKg: 36,
      reps: 8,
      estimated1RM: 45,
      totalVolumeKg: 18200,
      achievedAt: new Date()
    },
    alternatives: [
      { id: 'ex_1', name: 'Barbell Bench Press', equipment: 'Barbell & Bench', similarity: '95%' },
      { id: 'ex_4', name: 'Machine Chest Press', equipment: 'Machine', similarity: '90%' }
    ]
  },
  {
    _id: 'ex_3',
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    movementPattern: 'Incline Push',
    difficulty: 'INTERMEDIATE',
    primaryMuscleGroup: 'Clavicular Head (Upper Chest)',
    secondaryMuscleGroups: ['Anterior Deltoid', 'Triceps'],
    equipmentRequired: 'Dumbbells & Incline Bench (30°)',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    setup: 'Set adjustable bench to 30-degree incline. Position dumbbells on knees and kick back.',
    executionSteps: [
      'Start with dumbbells at upper chest level',
      'Press upward in a slight converging arc',
      'Lower with 3-second control to shoulder level'
    ],
    coachingCues: [
      'Keep incline at 30° to target upper chest and prevent shoulder dominance',
      'Tuck elbows slightly rather than flaring wide'
    ],
    commonMistakes: ['Setting incline too steep (45°+ shifts load to front delts)'],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-10 reps',
    restSeconds: 90,
    progressionMethod: 'Linear overload',
    personalBest: {
      weightKg: 34,
      reps: 8,
      estimated1RM: 42,
      totalVolumeKg: 16400,
      achievedAt: new Date()
    },
    alternatives: [
      { id: 'ex_1', name: 'Barbell Bench Press', equipment: 'Barbell', similarity: '85%' },
      { id: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'Dumbbells', similarity: '90%' }
    ]
  },
  {
    _id: 'ex_6',
    name: 'Barbell Back Squat',
    category: 'Legs',
    movementPattern: 'Squat',
    difficulty: 'ADVANCED',
    primaryMuscleGroup: 'Quadriceps & Gluteus Maximus',
    secondaryMuscleGroups: ['Hamstrings', 'Erector Spinae', 'Core'],
    equipmentRequired: 'Barbell & Squat Rack',
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
    setup: 'Step under bar resting across upper traps. Unrack and take two deliberate steps back.',
    executionSteps: [
      'Take deep diaphragmatic breath and brace core (Valsalva maneuver)',
      'Break at hips and knees simultaneously, descending under control',
      'Hit depth (hip crease below top of knee)',
      'Drive aggressively through midfoot to return to start'
    ],
    coachingCues: [
      'Keep chest elevated and spine neutral',
      'Spread the floor with feet to recruit glutes',
      'Do not let knees collapse inward during ascent'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse)',
      'Rounding lumbar spine at the bottom (butt wink)'
    ],
    recommendedSets: '4-5 sets',
    recommendedReps: '5-8 reps',
    restSeconds: 150,
    progressionMethod: 'Add +5kg when hitting top reps',
    personalBest: {
      weightKg: 140,
      reps: 5,
      estimated1RM: 162,
      totalVolumeKg: 68400,
      achievedAt: new Date()
    },
    alternatives: [
      { id: 'ex_7', name: 'Hack Squat (Machine)', equipment: 'Machine', similarity: '92%' },
      { id: 'ex_8', name: 'Leg Press', equipment: '45° Leg Press Machine', similarity: '88%' },
      { id: 'ex_9', name: 'Goblet Squat', equipment: 'Kettlebell / Dumbbell', similarity: '75%' }
    ]
  },
  {
    _id: 'ex_10',
    name: 'Barbell Deadlift',
    category: 'Back',
    movementPattern: 'Hinge',
    difficulty: 'ADVANCED',
    primaryMuscleGroup: 'Posterior Chain & Erector Spinae',
    secondaryMuscleGroups: ['Gluteus Maximus', 'Hamstrings', 'Lats', 'Traps'],
    equipmentRequired: 'Barbell & Plates',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    setup: 'Stand with midfoot under bar, hip-width stance. Grip bar just outside legs.',
    executionSteps: [
      'Pull slack out of the bar, engaging lats and locking lumbar spine',
      'Push the floor away through midfoot while extending hips and knees',
      'Lock out with upright posture without hyperextending lower back',
      'Hinge hips back and lower bar in a controlled path against shins'
    ],
    coachingCues: [
      'Protect lower back by wedging hips down and pulling chest up before lift',
      'Keep the bar scraping against shins throughout ascent'
    ],
    commonMistakes: ['Rounding the lower back off the floor', 'Jerking the barbell without pulling slack first'],
    recommendedSets: '3-4 sets',
    recommendedReps: '3-5 reps',
    restSeconds: 180,
    progressionMethod: 'Add +5kg upon achieving 5 clean reps',
    personalBest: {
      weightKg: 180,
      reps: 3,
      estimated1RM: 196,
      totalVolumeKg: 54000,
      achievedAt: new Date()
    },
    alternatives: [
      { id: 'ex_11', name: 'Trap Bar Deadlift', equipment: 'Hex / Trap Bar', similarity: '94%' },
      { id: 'ex_12', name: 'Romanian Deadlift (RDL)', equipment: 'Barbell / Dumbbells', similarity: '85%' }
    ]
  }
];

export const getExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, movementPattern, difficulty, equipment, search } = req.query;

    let exercises = MASTER_EXERCISE_CATALOG;

    if (mongoose.connection.readyState === 1) {
      const query: any = {};
      if (category) query.category = category;
      if (movementPattern) query.movementPattern = movementPattern;
      if (difficulty) query.difficulty = difficulty;
      if (equipment) query.equipmentRequired = new RegExp(String(equipment), 'i');
      if (search) query.name = new RegExp(String(search), 'i');

      const dbExercises = await Exercise.find(query);
      if (dbExercises.length > 0) {
        exercises = dbExercises as any;
      }
    }

    if (category && category !== 'All') {
      exercises = exercises.filter((e) => e.category.toLowerCase() === String(category).toLowerCase());
    }

    if (search) {
      const q = String(search).toLowerCase();
      exercises = exercises.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.primaryMuscleGroup.toLowerCase().includes(q)
      );
    }

    sendSuccess(res, exercises);
  } catch (err) {
    next(err);
  }
};

export const getExerciseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const exercise = MASTER_EXERCISE_CATALOG.find((e) => e._id === id) || MASTER_EXERCISE_CATALOG[0];

    sendSuccess(res, exercise);
  } catch (err) {
    next(err);
  }
};

export const getExerciseAlternatives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const exercise = MASTER_EXERCISE_CATALOG.find((e) => e._id === id) || MASTER_EXERCISE_CATALOG[0];

    const alternatives = exercise.alternatives || [
      { id: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'Dumbbells', similarity: '95%' },
      { id: 'ex_4', name: 'Machine Chest Press', equipment: 'Machine', similarity: '85%' }
    ];

    sendSuccess(res, {
      originalExerciseId: exercise._id,
      originalExerciseName: exercise.name,
      alternatives
    });
  } catch (err) {
    next(err);
  }
};
