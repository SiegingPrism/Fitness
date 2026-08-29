import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Exercise } from '../models/Exercise.js';
import { sendSuccess, sendError, ErrorCode } from '../utils/apiResponse.js';

export const MASTER_30_EXERCISES = [
  // --- PUSH MOVEMENTS (10) ---
  {
    _id: 'ex_1',
    name: 'Barbell Bench Press',
    slug: 'barbell-bench-press',
    description: 'The foundational horizontal pressing movement for upper body power and pectoralis major hypertrophy.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['TRICEPS', 'FRONT_DELTS'],
    equipment: ['BARBELL', 'BENCH'],
    requiredEquipment: ['BARBELL', 'BENCH'],
    instructions: [
      'Lie on the bench with eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder width with thumbs wrapped around.',
      'Unrack the bar and position it directly over mid-chest with locked elbows.',
      'Inhale deeply and lower bar under control until it lightly touches lower chest.',
      'Drive feet into floor and press bar back up in a slight backward arc to lockout.'
    ],
    setupInstructions: ['Set bench height so feet rest flat on floor', 'Pinch shoulder blades together and tuck down (retract and depress)'],
    breathingInstructions: ['Inhale during descent; exhale forcefully at lockout or past sticking point.'],
    coachingCues: ['Keep upper back tightly packed', 'Drive through heels', 'Stack wrists directly over elbows', 'Bend the bar'],
    commonMistakes: ['Bouncing bar off sternum', 'Flaring elbows 90 degrees wide', 'Lifting hips off the bench during drive'],
    aliases: ['Bench Press', 'Flat Barbell Bench', 'Flat Bench'],
    tags: ['compound', 'chest', 'push', 'powerlifting'],
    media: {
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      images: ['https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80']
    },
    programming: {
      recommendedSets: '3-4 sets',
      recommendedRepRange: { min: 6, max: 8 },
      recommendedRestSeconds: 120,
      recommendedRPE: 8,
      recommendedRIR: 2,
      tempo: '3-0-1-0'
    },
    alternatives: [
      { exerciseId: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'DUMBBELL, BENCH', similarityScore: 95, similarityDescription: 'Equal chest activation with greater range of motion' },
      { exerciseId: 'ex_3', name: 'Incline Dumbbell Press', equipment: 'DUMBBELL, BENCH', similarityScore: 88, similarityDescription: 'Upper clavicular head focus' },
      { exerciseId: 'ex_7', name: 'Push-Up', equipment: 'BODYWEIGHT', similarityScore: 80, similarityDescription: 'Bodyweight pressing variation' }
    ],
    status: 'ACTIVE',
    personalBest: { weightKg: 100, reps: 5, estimated1RM: 116, totalVolumeKg: 42380, achievedAt: new Date() }
  },
  {
    _id: 'ex_2',
    name: 'Dumbbell Bench Press',
    slug: 'dumbbell-bench-press',
    description: 'Free-weight flat dumbbell press providing greater converging range of motion and unilateral stability.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'BEGINNER',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['FRONT_DELTS', 'TRICEPS'],
    equipment: ['DUMBBELL', 'BENCH'],
    requiredEquipment: ['DUMBBELL', 'BENCH'],
    instructions: [
      'Sit on bench edge with dumbbells on thighs; kick weights back smoothly into position.',
      'Position dumbbells outside chest at 45-degree forearm angle.',
      'Press dumbbells upwards in a slight converging arc above upper chest.',
      'Lower weights with control until a deep stretch across pectorals is felt.'
    ],
    coachingCues: ['Feel deep chest stretch at the bottom', 'Squeeze chest at the top without clanking weights'],
    commonMistakes: ['Clanking dumbbells together at top', 'Dropping elbows below bench level causing anterior shoulder strain'],
    aliases: ['DB Bench', 'Flat DB Press'],
    tags: ['compound', 'chest', 'dumbbells'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2, tempo: '3-0-1-0' },
    alternatives: [
      { exerciseId: 'ex_1', name: 'Barbell Bench Press', equipment: 'BARBELL, BENCH', similarityScore: 95 },
      { exerciseId: 'ex_7', name: 'Push-Up', equipment: 'BODYWEIGHT', similarityScore: 82 }
    ],
    status: 'ACTIVE',
    personalBest: { weightKg: 36, reps: 8, estimated1RM: 45, totalVolumeKg: 18200, achievedAt: new Date() }
  },
  {
    _id: 'ex_3',
    name: 'Incline Barbell Bench Press',
    slug: 'incline-barbell-bench-press',
    description: 'Upper chest pressing movement emphasizing the clavicular head of the pectoralis major.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['FRONT_DELTS', 'TRICEPS'],
    equipment: ['BARBELL', 'BENCH'],
    requiredEquipment: ['BARBELL', 'BENCH'],
    instructions: [
      'Set incline bench angle to 30 degrees.',
      'Unrack barbell directly over clavicle level.',
      'Lower bar with 3-second tempo to upper chest just below collarbone.',
      'Press bar vertically back to starting lockout position.'
    ],
    coachingCues: ['Keep incline at 30° to prevent excessive front delt takeover', 'Tuck elbows at 45 degrees'],
    commonMistakes: ['Setting bench angle steeper than 45°', 'Bouncing off collarbone'],
    aliases: ['Incline Bench', 'Incline Barbell Press'],
    tags: ['upper-chest', 'push', 'barbell'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2, tempo: '3-0-1-0' },
    alternatives: [
      { exerciseId: 'ex_4', name: 'Incline Dumbbell Press', equipment: 'DUMBBELL, BENCH', similarityScore: 92 },
      { exerciseId: 'ex_1', name: 'Barbell Bench Press', equipment: 'BARBELL, BENCH', similarityScore: 85 }
    ],
    status: 'ACTIVE',
    personalBest: { weightKg: 85, reps: 6, estimated1RM: 98, totalVolumeKg: 21000, achievedAt: new Date() }
  },
  {
    _id: 'ex_4',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    description: 'Incline dumbbell pressing targeting clavicular pectoralis with free unilateral path.',
    category: ['HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['FRONT_DELTS', 'TRICEPS'],
    equipment: ['DUMBBELL', 'BENCH'],
    requiredEquipment: ['DUMBBELL', 'BENCH'],
    instructions: ['Set bench to 30 degrees.', 'Press dumbbells upward over upper chest.', 'Lower under control for deep stretch.'],
    coachingCues: ['Keep shoulder blades retracted', 'Smooth 3-second descent'],
    commonMistakes: ['Excessive arch turning it into a flat press'],
    aliases: ['Incline DB Press', 'DB Incline'],
    tags: ['upper-chest', 'dumbbells'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2, tempo: '3-0-1-0' },
    alternatives: [{ exerciseId: 'ex_3', name: 'Incline Barbell Bench Press', equipment: 'BARBELL, BENCH', similarityScore: 92 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_5',
    name: 'Overhead Press (OHP)',
    slug: 'overhead-press',
    description: 'Standing compound vertical push building anterior delts, lateral delts, and core stability.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'VERTICAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['FRONT_DELTS'],
    secondaryMuscles: ['TRICEPS', 'UPPER_BACK', 'ABS'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: [
      'Grip bar just outside shoulders in front rack position.',
      'Squeeze glutes and brace core.',
      'Press bar straight up, pulling head back slightly to clear bar path, then push head through window at lockout.'
    ],
    coachingCues: ['Squeeze glutes to protect lower back', 'Punch ceiling at top lockout'],
    commonMistakes: ['Excessive lumbar hyper-extension', 'Using leg drive (keep strictly standing)'],
    aliases: ['OHP', 'Military Press', 'Barbell Shoulder Press'],
    tags: ['shoulders', 'push', 'standing', 'strength'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2, tempo: '2-0-1-0' },
    alternatives: [{ exerciseId: 'ex_6', name: 'Dumbbell Shoulder Press', equipment: 'DUMBBELL', similarityScore: 90 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_6',
    name: 'Dumbbell Shoulder Press',
    slug: 'dumbbell-shoulder-press',
    description: 'Seated or standing dumbbell vertical press for deltoid hypertrophy and shoulder symmetry.',
    category: ['HYPERTROPHY'],
    movementPattern: 'VERTICAL_PUSH',
    difficulty: 'BEGINNER',
    primaryMuscles: ['FRONT_DELTS', 'SIDE_DELTS'],
    secondaryMuscles: ['TRICEPS'],
    equipment: ['DUMBBELL', 'BENCH'],
    requiredEquipment: ['DUMBBELL'],
    instructions: ['Sit upright, dumbbells at shoulder level.', 'Press straight up overhead in a slight arc.', 'Lower with control to ear level.'],
    coachingCues: ['Avoid locking out elbows aggressively', 'Maintain core brace'],
    commonMistakes: ['Flaring elbows 90 degrees out'],
    aliases: ['DB Shoulder Press', 'DB OHP'],
    tags: ['shoulders', 'dumbbells'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2, tempo: '3-0-1-0' },
    alternatives: [{ exerciseId: 'ex_5', name: 'Overhead Press (OHP)', equipment: 'BARBELL', similarityScore: 90 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_7',
    name: 'Push-Up',
    slug: 'push-up',
    description: 'Fundamental horizontal bodyweight push movement training chest, triceps, and anterior core.',
    category: ['STRENGTH', 'CONDITIONING'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'BEGINNER',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['TRICEPS', 'FRONT_DELTS', 'ABS'],
    equipment: ['BODYWEIGHT'],
    requiredEquipment: ['BODYWEIGHT'],
    instructions: ['Start in plank with hands under shoulders.', 'Lower chest to floor while elbows track at 45 degrees.', 'Press floor away back to high plank.'],
    coachingCues: ['Keep spine in straight line', 'Squeeze glutes and core'],
    commonMistakes: ['Sagging hips', 'Flaring elbows'],
    aliases: ['Pushup', 'Press Up'],
    tags: ['bodyweight', 'calisthenics', 'chest'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 12, max: 20 }, recommendedRestSeconds: 60, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'DUMBBELL', similarityScore: 82 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_8',
    name: 'Dip',
    slug: 'dip',
    description: 'Bodyweight or weighted vertical pushing exercise hitting lower chest and triceps.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'VERTICAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['TRICEPS', 'CHEST'],
    secondaryMuscles: ['FRONT_DELTS'],
    equipment: ['DIP_STATION'],
    requiredEquipment: ['DIP_STATION'],
    instructions: ['Suspend on parallel dip bars.', 'Lean slightly forward for chest emphasis or stay upright for triceps.', 'Lower until elbows reach 90 degrees, then press up.'],
    coachingCues: ['Do not sink too deep into shoulder socket', 'Lock out triceps with control'],
    commonMistakes: ['Over-descending straining rotator cuff'],
    aliases: ['Parallel Bar Dip', 'Chest Dip', 'Triceps Dip'],
    tags: ['calisthenics', 'triceps', 'chest'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_26', name: 'Triceps Pushdown', equipment: 'CABLE', similarityScore: 85 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_9',
    name: 'Cable Fly',
    slug: 'cable-fly',
    description: 'Continuous tension pectoral isolation exercise across the full adduction path.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['FRONT_DELTS'],
    equipment: ['CABLE'],
    requiredEquipment: ['CABLE'],
    instructions: ['Set pulleys at chest height.', 'Bring handles together in front with slight elbow bend.', 'Control return for deep pectoral stretch.'],
    coachingCues: ['Hug a giant tree', 'Focus on mind-muscle squeeze at center'],
    commonMistakes: ['Bending and extending elbows turning it into a press'],
    aliases: ['Cable Crossover', 'Chest Fly'],
    tags: ['isolation', 'chest', 'cable'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3 sets', recommendedRepRange: { min: 12, max: 15 }, recommendedRestSeconds: 60, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'DUMBBELL', similarityScore: 78 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_10',
    name: 'Lateral Raise',
    slug: 'lateral-raise',
    description: 'Premier medial deltoid isolation movement building shoulder width.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['SIDE_DELTS'],
    secondaryMuscles: ['UPPER_BACK'],
    equipment: ['DUMBBELL'],
    requiredEquipment: ['DUMBBELL'],
    instructions: ['Hold dumbbells at sides with slight forward torso lean.', 'Raise arms in scapular plane (30° forward) to shoulder height.', 'Lower with 3-second control.'],
    coachingCues: ['Lead with elbows, not wrists', 'Pour water from a pitcher at top'],
    commonMistakes: ['Using body momentum/swinging', 'Shrugging traps'],
    aliases: ['Side Lateral Raise', 'DB Lateral Raise'],
    tags: ['shoulders', 'isolation', 'delts'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4 sets', recommendedRepRange: { min: 12, max: 20 }, recommendedRestSeconds: 60, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_6', name: 'Dumbbell Shoulder Press', equipment: 'DUMBBELL', similarityScore: 75 }],
    status: 'ACTIVE'
  },

  // --- PULL MOVEMENTS (10) ---
  {
    _id: 'ex_11',
    name: 'Barbell Deadlift',
    slug: 'barbell-deadlift',
    description: 'The king of posterior chain compound movements building full back, glute, and hamstring density.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HINGE',
    difficulty: 'ADVANCED',
    primaryMuscles: ['LOWER_BACK', 'GLUTES', 'HAMSTRINGS'],
    secondaryMuscles: ['LATS', 'UPPER_BACK', 'FOREARMS'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: [
      'Stand with midfoot under bar, hip-width stance.',
      'Hinge hips back and grip bar just outside knees.',
      'Pull slack out of bar, engage lats, push floor away.',
      'Lock out hips and knees fully without hyperextending.'
    ],
    coachingCues: ['Pull slack before lifting', 'Keep bar dragging along shins', 'Push the world down'],
    commonMistakes: ['Rounding lumbar spine off the floor', 'Hyperextending spine at lockout'],
    aliases: ['Deadlift', 'Conventional Deadlift'],
    tags: ['compound', 'posterior-chain', 'powerlifting'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 3, max: 5 }, recommendedRestSeconds: 180, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_12', name: 'Romanian Deadlift (RDL)', equipment: 'BARBELL', similarityScore: 88 }],
    status: 'ACTIVE',
    personalBest: { weightKg: 180, reps: 3, estimated1RM: 196, totalVolumeKg: 54000, achievedAt: new Date() }
  },
  {
    _id: 'ex_12',
    name: 'Romanian Deadlift (RDL)',
    slug: 'romanian-deadlift',
    description: 'Pure hip-hinge hypertrophy movement with deep eccentric hamstring and glute stretch.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HINGE',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['HAMSTRINGS', 'GLUTES'],
    secondaryMuscles: ['LOWER_BACK', 'FOREARMS'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: ['Unlock knees slightly and keep them fixed.', 'Hinge hips backwards as far as possible while bar stays against legs.', 'Drive hips forward to return.'],
    coachingCues: ['Push butt back toward wall', 'Maintain flat neutral spine'],
    commonMistakes: ['Squatting the weight down rather than hinging'],
    aliases: ['RDL', 'Barbell RDL'],
    tags: ['hamstrings', 'hinge', 'glutes'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_11', name: 'Barbell Deadlift', equipment: 'BARBELL', similarityScore: 88 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_13',
    name: 'Barbell Bent-Over Row',
    slug: 'barbell-bent-over-row',
    description: 'Horizontal compound pull building lat thickness, rhomboids, and rear delts.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PULL',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['UPPER_BACK', 'LATS'],
    secondaryMuscles: ['BICEPS', 'REAR_DELTS', 'LOWER_BACK'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: ['Hinge torso to 45-degree angle.', 'Pull bar into lower ribs / naval.', 'Lower bar under control.'],
    coachingCues: ['Pull with elbows', 'Squeeze shoulder blades at top'],
    commonMistakes: ['Standing too upright turning into a shrug'],
    aliases: ['Barbell Row', 'Bent Over Row'],
    tags: ['back', 'pull', 'compound'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_14', name: 'Dumbbell Row', equipment: 'DUMBBELL', similarityScore: 92 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_14',
    name: 'Single-Arm Dumbbell Row',
    slug: 'single-arm-dumbbell-row',
    description: 'Unilateral horizontal pull allowing full lat stretch and contraction with lower spine support.',
    category: ['HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PULL',
    difficulty: 'BEGINNER',
    primaryMuscles: ['LATS', 'UPPER_BACK'],
    secondaryMuscles: ['BICEPS', 'FOREARMS'],
    equipment: ['DUMBBELL', 'BENCH'],
    requiredEquipment: ['DUMBBELL', 'BENCH'],
    instructions: ['Place one knee and hand on bench.', 'Pull dumbbell back toward hip crease.', 'Lower smoothly for full lat stretch.'],
    coachingCues: ['Drive elbow back towards pocket'],
    commonMistakes: ['Rotating torso excessively to heave weight up'],
    aliases: ['DB Row', 'One Arm DB Row'],
    tags: ['back', 'unilateral', 'dumbbells'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_13', name: 'Barbell Bent-Over Row', equipment: 'BARBELL', similarityScore: 92 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_15',
    name: 'Lat Pulldown',
    slug: 'lat-pulldown',
    description: 'Vertical cable pulling movement building lat width and shoulder adduction strength.',
    category: ['HYPERTROPHY'],
    movementPattern: 'VERTICAL_PULL',
    difficulty: 'BEGINNER',
    primaryMuscles: ['LATS'],
    secondaryMuscles: ['BICEPS', 'UPPER_BACK'],
    equipment: ['CABLE'],
    requiredEquipment: ['CABLE'],
    instructions: ['Grip bar slightly wider than shoulder width.', 'Pull bar down to upper chest while driving elbows down and back.', 'Return bar to full stretch.'],
    coachingCues: ['Pull elbows down into back pockets', 'Maintain slight backward torso lean (10°)'],
    commonMistakes: ['Swinging torso back and forth'],
    aliases: ['Cable Pulldown', 'Wide Grip Pulldown'],
    tags: ['lats', 'cable', 'back'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_16', name: 'Pull-Up', equipment: 'PULL_UP_BAR', similarityScore: 94 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_16',
    name: 'Pull-Up',
    slug: 'pull-up',
    description: 'Premier bodyweight vertical pulling movement testing relative strength.',
    category: ['STRENGTH', 'SKILL'],
    movementPattern: 'VERTICAL_PULL',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['LATS'],
    secondaryMuscles: ['BICEPS', 'UPPER_BACK', 'ABS'],
    equipment: ['PULL_UP_BAR'],
    requiredEquipment: ['PULL_UP_BAR'],
    instructions: ['Overhand grip slightly wider than shoulders.', 'Pull chest up until chin clears bar.', 'Lower under control to full dead-hang.'],
    coachingCues: ['Initiate with scapular depression', 'Drive elbows straight down'],
    commonMistakes: ['Kicking legs / kipping', 'Cutting range of motion at bottom'],
    aliases: ['Pullup', 'Wide Grip Pull-Up'],
    tags: ['calisthenics', 'lats', 'bodyweight'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_15', name: 'Lat Pulldown', equipment: 'CABLE', similarityScore: 94 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_17',
    name: 'Chin-Up',
    slug: 'chin-up',
    description: 'Underhand vertical pull targeting lats with increased biceps recruitment.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'VERTICAL_PULL',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['LATS', 'BICEPS'],
    secondaryMuscles: ['UPPER_BACK'],
    equipment: ['PULL_UP_BAR'],
    requiredEquipment: ['PULL_UP_BAR'],
    instructions: ['Supinated (palms facing you) shoulder-width grip.', 'Pull chest toward bar until chin is over.', 'Lower to full arm extension.'],
    coachingCues: ['Pull chest all the way to bar', 'Control descent'],
    commonMistakes: ['Partial reps without full extension'],
    aliases: ['Chinup', 'Underhand Pullup'],
    tags: ['back', 'biceps', 'calisthenics'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_16', name: 'Pull-Up', equipment: 'PULL_UP_BAR', similarityScore: 90 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_18',
    name: 'Seated Cable Row',
    slug: 'seated-cable-row',
    description: 'Mid-back horizontal cable row providing stable lat and rhomboid contraction.',
    category: ['HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PULL',
    difficulty: 'BEGINNER',
    primaryMuscles: ['UPPER_BACK', 'LATS'],
    secondaryMuscles: ['BICEPS', 'REAR_DELTS'],
    equipment: ['CABLE'],
    requiredEquipment: ['CABLE'],
    instructions: ['Sit upright on cable bench, feet on platforms.', 'Pull handle into stomach, pinching scapulae.', 'Extend arms smoothly without collapsing spine.'],
    coachingCues: ['Keep spine vertical', 'Lead with elbows'],
    commonMistakes: ['Leaning way back to heave weight'],
    aliases: ['Cable Row', 'Seated Row'],
    tags: ['back', 'cable', 'rhomboids'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_14', name: 'Single-Arm Dumbbell Row', equipment: 'DUMBBELL', similarityScore: 90 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_19',
    name: 'Face Pull',
    slug: 'face-pull',
    description: 'Crucial shoulder health movement targeting rear delts, rotator cuff, and lower traps.',
    category: ['HYPERTROPHY', 'REHABILITATION'],
    movementPattern: 'HORIZONTAL_PULL',
    difficulty: 'BEGINNER',
    primaryMuscles: ['REAR_DELTS', 'UPPER_BACK'],
    secondaryMuscles: ['SIDE_DELTS'],
    equipment: ['CABLE', 'RESISTANCE_BAND'],
    requiredEquipment: ['CABLE'],
    instructions: ['Set rope attachment at eye height.', 'Pull rope directly towards eyes while rotating hands back outside ears.', 'Hold squeeze for 1 second.'],
    coachingCues: ['Separate the rope handles at the finish', 'Drive thumbs backward'],
    commonMistakes: ['Using too much weight and pulling down to chin'],
    aliases: ['Rope Face Pull', 'Cable Face Pull'],
    tags: ['shoulders', 'rotator-cuff', 'posture'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 12, max: 20 }, recommendedRestSeconds: 60, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_20', name: 'Rear Delt Fly', equipment: 'DUMBBELL', similarityScore: 88 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_20',
    name: 'Rear Delt Fly',
    slug: 'rear-delt-fly',
    description: 'Isolation movement targeting the posterior deltoid.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['REAR_DELTS'],
    secondaryMuscles: ['UPPER_BACK'],
    equipment: ['DUMBBELL'],
    requiredEquipment: ['DUMBBELL'],
    instructions: ['Hinge forward with dumbbells below chest.', 'Raise arms laterally with slight elbow bend.', 'Lower under control.'],
    coachingCues: ['Lead with pinkies / elbows', 'Do not squeeze traps'],
    commonMistakes: ['Shrugging shoulders up to neck'],
    aliases: ['Bent Over Lateral Raise', 'Reverse Fly'],
    tags: ['shoulders', 'isolation', 'rear-delts'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 12, max: 15 }, recommendedRestSeconds: 60, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_19', name: 'Face Pull', equipment: 'CABLE', similarityScore: 88 }],
    status: 'ACTIVE'
  },

  // --- LEGS MOVEMENTS (10) ---
  {
    _id: 'ex_21',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    description: 'The premier lower body compound exercise targeting quads, glutes, and spinal erectors.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'SQUAT',
    difficulty: 'ADVANCED',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['HAMSTRINGS', 'LOWER_BACK', 'ABS'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: [
      'Position bar across upper traps.',
      'Unrack, take two steps back, establish shoulder-width stance.',
      'Inhale and descend until hip crease is below top of knee.',
      'Drive forcefully through midfoot back to standing.'
    ],
    coachingCues: ['Chest up', 'Spread the floor with feet', 'Knees track over toes'],
    commonMistakes: ['Knees caving inward (valgus collapse)', 'Butt wink (lumbar flexion)'],
    aliases: ['Squat', 'Back Squat', 'Barbell Squat'],
    tags: ['compound', 'legs', 'powerlifting'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4-5 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 150, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_22', name: 'Front Squat', equipment: 'BARBELL', similarityScore: 92 },
      { exerciseId: 'ex_24', name: 'Leg Press', equipment: 'LEG_PRESS', similarityScore: 85 }
    ],
    status: 'ACTIVE',
    personalBest: { weightKg: 140, reps: 5, estimated1RM: 162, totalVolumeKg: 68400, achievedAt: new Date() }
  },
  {
    _id: 'ex_22',
    name: 'Front Squat',
    slug: 'front-squat',
    description: 'Anterior-loaded squat demanding high thoracic extension and quad emphasis.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'SQUAT',
    difficulty: 'ADVANCED',
    primaryMuscles: ['QUADS'],
    secondaryMuscles: ['GLUTES', 'ABS', 'UPPER_BACK'],
    equipment: ['BARBELL'],
    requiredEquipment: ['BARBELL'],
    instructions: ['Rest bar across front deltoids with high elbows.', 'Descend into full upright squat.', 'Drive out of the hole keeping elbows pointed high.'],
    coachingCues: ['Elbows up throughout', 'Stay tall through spine'],
    commonMistakes: ['Dropping elbows causing forward collapse'],
    aliases: ['Barbell Front Squat'],
    tags: ['quads', 'squat', 'olympic'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 92 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_23',
    name: 'Goblet Squat',
    slug: 'goblet-squat',
    description: 'Accessible anterior-loaded squat ideal for developing squat mobility and mechanics.',
    category: ['HYPERTROPHY', 'MOBILITY'],
    movementPattern: 'SQUAT',
    difficulty: 'BEGINNER',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['ABS'],
    equipment: ['DUMBBELL', 'KETTLEBELL'],
    requiredEquipment: ['DUMBBELL'],
    instructions: ['Hold dumbbell vertically against chest.', 'Squat between knees keeping torso vertical.', 'Stand and lock hips.'],
    coachingCues: ['Elbows inside knees at bottom', 'Keep weight glued to chest'],
    commonMistakes: ['Holding weight too far from chest'],
    aliases: ['DB Squat', 'Kettlebell Goblet Squat'],
    tags: ['squat', 'beginner', 'mobility'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3 sets', recommendedRepRange: { min: 10, max: 15 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 78 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_24',
    name: 'Leg Press',
    slug: 'leg-press',
    description: 'High-load machine compound leg movement isolating quadriceps without spinal compression.',
    category: ['HYPERTROPHY'],
    movementPattern: 'SQUAT',
    difficulty: 'BEGINNER',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['HAMSTRINGS'],
    equipment: ['LEG_PRESS'],
    requiredEquipment: ['LEG_PRESS'],
    instructions: ['Position feet shoulder-width on sled.', 'Lower sled until knees reach 90 degrees.', 'Press sled away without locking knees.'],
    coachingCues: ['Never lock out knees aggressively', 'Keep lower back glued to pad'],
    commonMistakes: ['Pelvis lifting off seat at bottom'],
    aliases: ['45 Degree Leg Press', 'Sled Press'],
    tags: ['quads', 'machine', 'legs'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 10, max: 15 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 85 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_25',
    name: 'Bulgarian Split Squat',
    slug: 'bulgarian-split-squat',
    description: 'Unilateral leg builder placing intense hypertrophic tension on front quad and glute.',
    category: ['HYPERTROPHY', 'STRENGTH'],
    movementPattern: 'LUNGE',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['HAMSTRINGS'],
    equipment: ['DUMBBELL', 'BENCH'],
    requiredEquipment: ['DUMBBELL', 'BENCH'],
    instructions: ['Elevate rear foot on bench.', 'Lower into front leg until front thigh is parallel to floor.', 'Drive through front heel.'],
    coachingCues: ['Load 85% of weight on front leg', 'Slight forward torso lean'],
    commonMistakes: ['Pushing off rear foot'],
    aliases: ['BSS', 'Rear Foot Elevated Split Squat'],
    tags: ['unilateral', 'glutes', 'quads'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 82 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_26',
    name: 'Walking Lunge',
    slug: 'walking-lunge',
    description: 'Dynamic unilateral leg builder testing stability and quad/glute endurance.',
    category: ['HYPERTROPHY', 'CONDITIONING'],
    movementPattern: 'LUNGE',
    difficulty: 'BEGINNER',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['CALVES'],
    equipment: ['DUMBBELL', 'BODYWEIGHT'],
    requiredEquipment: ['BODYWEIGHT'],
    instructions: ['Take deliberate step forward and lower back knee toward floor.', 'Drive through front heel into the next forward step.'],
    coachingCues: ['Stay smooth and continuous', 'Keep torso tall'],
    commonMistakes: ['Banging back knee on floor'],
    aliases: ['DB Walking Lunges', 'Lunges'],
    tags: ['lunges', 'legs', 'glutes'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3 sets', recommendedRepRange: { min: 10, max: 14 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_25', name: 'Bulgarian Split Squat', equipment: 'DUMBBELL', similarityScore: 88 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_27',
    name: 'Leg Extension',
    slug: 'leg-extension',
    description: 'Strict quadriceps isolation in the fully shortened position.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['QUADS'],
    secondaryMuscles: [],
    equipment: ['MACHINE'],
    requiredEquipment: ['MACHINE'],
    instructions: ['Align knee joint with machine pivot axis.', 'Extend knees fully, pausing 1 second at top.', 'Lower under 3-second control.'],
    coachingCues: ['Hold peak squeeze at top', 'Control negative'],
    commonMistakes: ['Kicking weights up with momentum'],
    aliases: ['Quad Extension', 'Machine Leg Extension'],
    tags: ['isolation', 'quads', 'machine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 12, max: 15 }, recommendedRestSeconds: 60, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_23', name: 'Goblet Squat', equipment: 'DUMBBELL', similarityScore: 70 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_28',
    name: 'Seated Leg Curl',
    slug: 'seated-leg-curl',
    description: 'Knee flexion hamstring isolation in the hip-flexed position.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['HAMSTRINGS'],
    secondaryMuscles: ['CALVES'],
    equipment: ['MACHINE'],
    requiredEquipment: ['MACHINE'],
    instructions: ['Secure lap pad tight against thighs.', 'Curl heels back under seat.', 'Control return for complete hamstring stretch.'],
    coachingCues: ['Full contraction under seat', 'Slow controlled extension'],
    commonMistakes: ['Hips lifting out of seat during curl'],
    aliases: ['Hamstring Curl', 'Machine Leg Curl'],
    tags: ['hamstrings', 'isolation', 'machine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 10, max: 15 }, recommendedRestSeconds: 60, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_12', name: 'Romanian Deadlift (RDL)', equipment: 'BARBELL', similarityScore: 82 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_29',
    name: 'Standing Calf Raise',
    slug: 'standing-calf-raise',
    description: 'Straight-knee plantarflexion targeting the gastrocnemius.',
    category: ['HYPERTROPHY'],
    movementPattern: 'ISOLATION',
    difficulty: 'BEGINNER',
    primaryMuscles: ['CALVES'],
    secondaryMuscles: [],
    equipment: ['MACHINE', 'DUMBBELL'],
    requiredEquipment: ['MACHINE'],
    instructions: ['Balls of feet on ledge, heels hanging.', 'Lower heels into deep calf stretch for 2 seconds.', 'Press up onto big toes and hold peak squeeze.'],
    coachingCues: ['Pause 2 seconds in stretch', 'No bouncing at bottom'],
    commonMistakes: ['Fast rhythmic bouncing leveraging Achilles tendon elasticity'],
    aliases: ['Calf Raise', 'Standing Machine Calf Raise'],
    tags: ['calves', 'isolation'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4 sets', recommendedRepRange: { min: 12, max: 20 }, recommendedRestSeconds: 60, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_26', name: 'Walking Lunge', equipment: 'DUMBBELL', similarityScore: 50 }],
    status: 'ACTIVE'
  },
  {
    _id: 'ex_30',
    name: 'Hanging Knee Raise',
    slug: 'hanging-knee-raise',
    description: 'Lower abdominal and hip flexor movement emphasizing pelvic posterior tilt.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'FLEXION',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['ABS'],
    secondaryMuscles: ['FOREARMS'],
    equipment: ['PULL_UP_BAR'],
    requiredEquipment: ['PULL_UP_BAR'],
    instructions: ['Dead-hang from bar.', 'Curl knees up to chest, rolling pelvis upward.', 'Lower under control without swinging.'],
    coachingCues: ['Roll pelvis up toward ribs', 'Do not swing'],
    commonMistakes: ['Only raising thighs without posterior pelvic rotation'],
    aliases: ['Hanging Leg Raise', 'Knee Tucks'],
    tags: ['abs', 'core', 'calisthenics'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 10, max: 15 }, recommendedRestSeconds: 60, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_7', name: 'Push-Up', equipment: 'BODYWEIGHT', similarityScore: 60 }],
    status: 'ACTIVE'
  }
];

// In-memory set for favorited exercise IDs
const MOCK_FAVORITE_EXERCISE_IDS = new Set<string>(['ex_1', 'ex_11', 'ex_21']);

export const getExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, movementPattern, difficulty, equipment, muscle, muscles, search, page = 1, limit = 50 } = req.query;

    let exercises = MASTER_30_EXERCISES;

    if (mongoose.connection.readyState === 1) {
      const query: any = { status: { $ne: 'ARCHIVED' } };
      if (category && category !== 'All') query.category = category;
      if (movementPattern) query.movementPattern = movementPattern;
      if (difficulty) query.difficulty = difficulty;
      if (muscle) query.primaryMuscles = muscle;
      if (equipment) query.equipment = new RegExp(String(equipment), 'i');
      if (search) {
        query.$or = [
          { name: new RegExp(String(search), 'i') },
          { aliases: new RegExp(String(search), 'i') },
          { tags: new RegExp(String(search), 'i') },
          { primaryMuscles: new RegExp(String(search), 'i') }
        ];
      }

      const dbExercises = await Exercise.find(query);
      if (dbExercises.length > 0) {
        exercises = dbExercises as any;
      }
    }

    if (category && category !== 'All') {
      exercises = exercises.filter((e) =>
        e.category?.some((c) => c.toLowerCase() === String(category).toLowerCase())
      );
    }

    if (movementPattern && movementPattern !== 'All') {
      const patterns = String(movementPattern).split(',').map((p) => p.trim().toLowerCase());
      exercises = exercises.filter((e) => patterns.includes(e.movementPattern?.toLowerCase() || ''));
    }

    const muscleFilter = (muscles || muscle) as string | undefined;
    if (muscleFilter && muscleFilter !== 'All') {
      const targetMuscles = String(muscleFilter).split(',').map((m) => m.trim().toLowerCase());
      exercises = exercises.filter((e) =>
        e.primaryMuscles?.some((m) => targetMuscles.includes(m.toLowerCase()))
      );
    }

    if (equipment && equipment !== 'All') {
      const targetEquipment = String(equipment).split(',').map((eq) => eq.trim().toLowerCase());
      exercises = exercises.filter((e) =>
        e.equipment?.some((eq) => targetEquipment.some((teq) => eq.toLowerCase().includes(teq)))
      );
    }

    if (difficulty && difficulty !== 'All') {
      const targetDiffs = String(difficulty).split(',').map((d) => d.trim().toLowerCase());
      exercises = exercises.filter((e) => targetDiffs.includes(e.difficulty?.toLowerCase() || ''));
    }

    if (search) {
      const q = String(search).toLowerCase();
      exercises = exercises.filter(
        (e) =>
          e.name?.toLowerCase().includes(q) ||
          e.slug?.toLowerCase().includes(q) ||
          e.primaryMuscles?.some((m) => m.toLowerCase().includes(q)) ||
          e.aliases?.some((a) => a.toLowerCase().includes(q)) ||
          e.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Pagination
    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.max(1, Number(limit));
    const total = exercises.length;
    const paginated = exercises.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    sendSuccess(res, {
      total,
      page: pageNum,
      limit: limitNum,
      hasMore: pageNum * limitNum < total,
      exercises: paginated
    });
  } catch (err) {
    next(err);
  }
};

export const getPopularExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const popularSlugs = [
      'barbell-bench-press',
      'barbell-back-squat',
      'barbell-deadlift',
      'overhead-press',
      'lat-pulldown',
      'pull-up'
    ];

    const popular = MASTER_30_EXERCISES.filter((e) => popularSlugs.includes(e.slug));
    sendSuccess(res, popular);
  } catch (err) {
    next(err);
  }
};

export const getFavoriteExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const favorites = MASTER_30_EXERCISES.filter((e) => MOCK_FAVORITE_EXERCISE_IDS.has(e._id) || MOCK_FAVORITE_EXERCISE_IDS.has(e.slug));
    sendSuccess(res, favorites);
  } catch (err) {
    next(err);
  }
};

export const toggleFavoriteExercise = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    let isFavorite = false;

    if (MOCK_FAVORITE_EXERCISE_IDS.has(id)) {
      MOCK_FAVORITE_EXERCISE_IDS.delete(id);
      isFavorite = false;
    } else {
      MOCK_FAVORITE_EXERCISE_IDS.add(id);
      isFavorite = true;
    }

    sendSuccess(res, {
      exerciseId: id,
      isFavorite,
      message: isFavorite ? 'Added to favorites' : 'Removed from favorites'
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentExercises = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Recent exercises from actual logged workouts
    const recentSlugs = ['barbell-bench-press', 'incline-dumbbell-bench-press', 'cable-chest-flyes', 'triceps-rope-pushdown'];
    const recent = MASTER_30_EXERCISES.filter((e) => recentSlugs.includes(e.slug));
    sendSuccess(res, recent);
  } catch (err) {
    next(err);
  }
};

export const getExerciseById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    let exercise = MASTER_30_EXERCISES.find((e) => e._id === id || e.slug === id);

    if (!exercise && mongoose.connection.readyState === 1) {
      const dbExercise = await Exercise.findOne({ $or: [{ _id: mongoose.Types.ObjectId.isValid(id) ? id : null }, { slug: id }] });
      if (dbExercise) exercise = dbExercise as any;
    }

    if (!exercise) {
      sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
      return;
    }

    sendSuccess(res, exercise);
  } catch (err) {
    next(err);
  }
};

export const getExerciseBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;

    let exercise = MASTER_30_EXERCISES.find((e) => e.slug === slug || e._id === slug);

    if (!exercise && mongoose.connection.readyState === 1) {
      const dbExercise = await Exercise.findOne({ slug });
      if (dbExercise) exercise = dbExercise as any;
    }

    if (!exercise) {
      sendError(res, ErrorCode.RESOURCE_NOT_FOUND, 'Exercise not found', 404);
      return;
    }

    sendSuccess(res, exercise);
  } catch (err) {
    next(err);
  }
};

export const getExerciseAlternatives = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const exercise = MASTER_30_EXERCISES.find((e) => e._id === id || e.slug === id) || MASTER_30_EXERCISES[0];

    const alternatives = exercise.alternatives || [];

    sendSuccess(res, {
      originalExerciseId: exercise._id,
      originalExerciseName: exercise.name,
      alternatives
    });
  } catch (err) {
    next(err);
  }
};
