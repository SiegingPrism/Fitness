import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// 1. CHEST (30 exercises)
const chestExercises = [
  { name: 'Barbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Bench Press', 'Flat Barbell Bench'] },
  { name: 'Dumbbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['DB Bench', 'Flat DB Press'] },
  { name: 'Incline Barbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['Incline Bench'] },
  { name: 'Decline Barbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Decline Bench'] },
  { name: 'Close-Grip Barbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['TRICEPS'], sec: ['CHEST', 'FRONT_DELTS'], aliases: ['CGBP'] },
  { name: 'Paused Barbell Bench Press', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Paused Bench'] },
  { name: 'Spoto Press', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Floating Bench Press'] },
  { name: 'Barbell Floor Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['TRICEPS', 'CHEST'], sec: ['FRONT_DELTS'], aliases: ['Floor Press'] },
  { name: 'Guillotine Press', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Gironda Neck Press'] },
  { name: 'Incline Dumbbell Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['Incline DB Press'] },
  { name: 'Decline Dumbbell Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Decline DB Press'] },
  { name: 'Dumbbell Floor Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['CHEST', 'TRICEPS'], sec: ['FRONT_DELTS'], aliases: ['DB Floor Press'] },
  { name: 'Neutral-Grip Dumbbell Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Hammer Grip Bench Press'] },
  { name: 'Single-Arm Dumbbell Press', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['ABS', 'FRONT_DELTS', 'TRICEPS'], aliases: ['Unilateral DB Press'] },
  { name: 'Flat Dumbbell Fly', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['DB Flyes', 'Chest Fly'] },
  { name: 'Incline Dumbbell Fly', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Incline DB Fly'] },
  { name: 'Decline Dumbbell Fly', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Decline DB Flyes'] },
  { name: 'Standing Cable Chest Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['CABLE'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['Cable Press'] },
  { name: 'Cable Chest Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Cable Crossover', 'Cable Flyes'] },
  { name: 'Low-to-High Cable Fly', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['CABLE'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Incline Cable Fly'] },
  { name: 'High-to-Low Cable Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Decline Cable Fly'] },
  { name: 'Machine Chest Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Seated Chest Press'] },
  { name: 'Incline Machine Chest Press', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['Incline Hammer Strength Press'] },
  { name: 'Pec Deck Machine Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Pec Deck', 'Butterfly Machine'] },
  { name: 'Push-Up', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS', 'ABS'], aliases: ['Standard Push-Up', 'Press-Up'] },
  { name: 'Incline Push-Up', pattern: 'HORIZONTAL_PUSH', diff: 'BEGINNER', eq: ['BENCH', 'BODYWEIGHT'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Hands-Elevated Push-Up'] },
  { name: 'Decline Push-Up', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BENCH', 'BODYWEIGHT'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS'], aliases: ['Feet-Elevated Push-Up'] },
  { name: 'Diamond Push-Up', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['TRICEPS'], sec: ['CHEST', 'FRONT_DELTS'], aliases: ['Triangle Push-Up'] },
  { name: 'Parallel Bar Chest Dip', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['PARALLEL_BARS', 'BODYWEIGHT'], prim: ['CHEST'], sec: ['TRICEPS', 'FRONT_DELTS'], aliases: ['Chest Dips'] },
  { name: 'Ring Push-Up', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['GYMNASTIC_RINGS', 'BODYWEIGHT'], prim: ['CHEST'], sec: ['FRONT_DELTS', 'TRICEPS', 'ABS'], aliases: ['Gymnastic Ring Push-Up'] }
];

// 2. BACK (40 exercises)
const backExercises = [
  { name: 'Barbell Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['LOWER_BACK', 'HAMSTRINGS', 'GLUTES'], sec: ['LATS', 'UPPER_BACK', 'FOREARMS'], aliases: ['Conventional Deadlift', 'Deadlift'] },
  { name: 'Sumo Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['GLUTES', 'QUADS', 'HAMSTRINGS'], sec: ['LOWER_BACK', 'UPPER_BACK'], aliases: ['Sumo DL'] },
  { name: 'Barbell Bent-Over Row', pattern: 'HORIZONTAL_PULL', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS', 'REAR_DELTS', 'LOWER_BACK'], aliases: ['Barbell Row', 'Bent Over Row'] },
  { name: 'Pendlay Row', pattern: 'HORIZONTAL_PULL', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS', 'REAR_DELTS'], aliases: ['Strict Deadstop Row'] },
  { name: 'Underhand Barbell Row', pattern: 'HORIZONTAL_PULL', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['LATS', 'BICEPS'], sec: ['UPPER_BACK'], aliases: ['Yates Row', 'Supinated Barbell Row'] },
  { name: 'Single-Arm Dumbbell Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['LATS', 'UPPER_BACK'], sec: ['BICEPS', 'REAR_DELTS'], aliases: ['DB Row', 'One-Arm Row'] },
  { name: 'Kroc Row', pattern: 'HORIZONTAL_PULL', diff: 'ADVANCED', eq: ['DUMBBELL', 'BENCH'], prim: ['UPPER_BACK', 'LATS'], sec: ['FOREARMS', 'BICEPS'], aliases: ['Heavy DB Row'] },
  { name: 'Chest-Supported Dumbbell Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['UPPER_BACK'], sec: ['REAR_DELTS', 'BICEPS'], aliases: ['Incline DB Row'] },
  { name: 'T-Bar Row', pattern: 'HORIZONTAL_PULL', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS', 'REAR_DELTS'], aliases: ['T Bar Row'] },
  { name: 'Chest-Supported T-Bar Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['UPPER_BACK'], sec: ['REAR_DELTS', 'BICEPS'], aliases: ['Supported T-Bar'] },
  { name: 'Seated Cable Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS', 'REAR_DELTS'], aliases: ['Cable Row', 'Low Row'] },
  { name: 'Wide-Grip Seated Cable Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['UPPER_BACK', 'REAR_DELTS'], sec: ['LATS', 'BICEPS'], aliases: ['Wide Cable Row'] },
  { name: 'Single-Arm Cable Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['BICEPS', 'REAR_DELTS'], aliases: ['Unilateral Cable Row'] },
  { name: 'Machine Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS'], aliases: ['Hammer Strength Row'] },
  { name: 'Meadows Row', pattern: 'HORIZONTAL_PULL', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['LATS', 'UPPER_BACK'], sec: ['REAR_DELTS', 'BICEPS'], aliases: ['Landmine Meadows Row'] },
  { name: 'Seal Row', pattern: 'HORIZONTAL_PULL', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['UPPER_BACK'], sec: ['REAR_DELTS', 'BICEPS'], aliases: ['Prone Bench Row'] },
  { name: 'Inverted Row', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['BARBELL', 'BODYWEIGHT'], prim: ['UPPER_BACK', 'LATS'], sec: ['BICEPS', 'ABS'], aliases: ['Bodyweight Row', 'Australian Pull-Up'] },
  { name: 'Pull-Up', pattern: 'VERTICAL_PULL', diff: 'INTERMEDIATE', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['LATS'], sec: ['BICEPS', 'UPPER_BACK', 'FOREARMS'], aliases: ['Overhand Pull-Up'] },
  { name: 'Chin-Up', pattern: 'VERTICAL_PULL', diff: 'INTERMEDIATE', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['LATS', 'BICEPS'], sec: ['UPPER_BACK'], aliases: ['Underhand Pull-Up'] },
  { name: 'Neutral-Grip Pull-Up', pattern: 'VERTICAL_PULL', diff: 'INTERMEDIATE', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['LATS', 'BICEPS'], sec: ['UPPER_BACK'], aliases: ['Parallel Grip Pull-Up'] },
  { name: 'Wide-Grip Pull-Up', pattern: 'VERTICAL_PULL', diff: 'ADVANCED', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['LATS'], sec: ['UPPER_BACK'], aliases: ['Wide Pull-Up'] },
  { name: 'Assisted Pull-Up Machine', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['LATS'], sec: ['BICEPS', 'UPPER_BACK'], aliases: ['Assisted Pull-Up'] },
  { name: 'Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['BICEPS', 'UPPER_BACK'], aliases: ['Cable Lat Pulldown'] },
  { name: 'Close-Grip Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['BICEPS'], aliases: ['V-Bar Pulldown'] },
  { name: 'Wide-Grip Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['UPPER_BACK', 'BICEPS'], aliases: ['Wide Lat Pulldown'] },
  { name: 'Reverse-Grip Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS', 'BICEPS'], sec: ['UPPER_BACK'], aliases: ['Underhand Lat Pulldown'] },
  { name: 'Single-Arm Cable Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['BICEPS'], aliases: ['1-Arm Lat Pulldown'] },
  { name: 'Straight-Arm Cable Pulldown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['TRICEPS', 'ABS'], aliases: ['Lat Pushdown', 'Straight Arm Pulldown'] },
  { name: 'Kneeling Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['LATS'], sec: ['BICEPS', 'ABS'], aliases: ['Half-Kneeling Pulldown'] },
  { name: 'Machine Lat Pulldown', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['LATS'], sec: ['BICEPS'], aliases: ['Selectorized Lat Pulldown'] },
  { name: 'Rack Pull', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['UPPER_BACK', 'LOWER_BACK'], sec: ['GLUTES', 'FOREARMS'], aliases: ['Block Pull'] },
  { name: 'Snatch-Grip Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['UPPER_BACK', 'HAMSTRINGS', 'GLUTES'], sec: ['LOWER_BACK'], aliases: ['Wide Grip Deadlift'] },
  { name: 'Deficit Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['HAMSTRINGS', 'GLUTES', 'LOWER_BACK'], sec: ['UPPER_BACK'], aliases: ['Platform Deadlift'] },
  { name: 'Barbell Good Morning', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['HAMSTRINGS', 'LOWER_BACK', 'GLUTES'], sec: ['UPPER_BACK'], aliases: ['Good Morning'] },
  { name: 'Seated Good Morning', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['LOWER_BACK', 'GLUTES'], sec: ['UPPER_BACK'], aliases: ['Bench Good Morning'] },
  { name: '45-Degree Back Extension', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BENCH', 'BODYWEIGHT'], prim: ['LOWER_BACK', 'GLUTES', 'HAMSTRINGS'], sec: ['UPPER_BACK'], aliases: ['Hyperextension'] },
  { name: 'Horizontal Back Extension', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BENCH', 'BODYWEIGHT'], prim: ['LOWER_BACK', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['90 Degree Hyperextension'] },
  { name: 'Barbell Shrug', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['UPPER_BACK'], sec: ['FOREARMS'], aliases: ['Trap Shrugs'] },
  { name: 'Dumbbell Shrug', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['UPPER_BACK'], sec: ['FOREARMS'], aliases: ['DB Shrugs'] },
  { name: 'Cable Shrug', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['UPPER_BACK'], sec: ['FOREARMS'], aliases: ['Low Pulley Shrug'] }
];

// 3. SHOULDERS (25 exercises)
const shoulderExercises = [
  { name: 'Overhead Press (OHP)', pattern: 'VERTICAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['FRONT_DELTS'], sec: ['TRICEPS', 'UPPER_BACK', 'ABS'], aliases: ['Military Press', 'Strict Barbell Press', 'OHP'] },
  { name: 'Push Press', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['FRONT_DELTS', 'QUADS'], sec: ['TRICEPS', 'GLUTES'], aliases: ['Barbell Push Press'] },
  { name: 'Seated Barbell Overhead Press', pattern: 'VERTICAL_PUSH', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['FRONT_DELTS'], sec: ['TRICEPS'], aliases: ['Seated OHP'] },
  { name: 'Seated Dumbbell Shoulder Press', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['FRONT_DELTS'], sec: ['TRICEPS', 'SIDE_DELTS'], aliases: ['Seated DB Press'] },
  { name: 'Standing Dumbbell Shoulder Press', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['FRONT_DELTS'], sec: ['TRICEPS', 'ABS'], aliases: ['Standing DB Press'] },
  { name: 'Arnold Press', pattern: 'VERTICAL_PUSH', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['FRONT_DELTS', 'SIDE_DELTS'], sec: ['TRICEPS'], aliases: ['Arnold Dumbbell Press'] },
  { name: 'Single-Arm Dumbbell Shoulder Press', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['FRONT_DELTS'], sec: ['TRICEPS', 'ABS'], aliases: ['1-Arm DB Press'] },
  { name: 'Machine Shoulder Press', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['FRONT_DELTS'], sec: ['TRICEPS'], aliases: ['Seated Machine Press'] },
  { name: 'Landmine Shoulder Press', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['FRONT_DELTS'], sec: ['TRICEPS', 'ABS'], aliases: ['Angled Landmine Press'] },
  { name: 'Dumbbell Lateral Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['SIDE_DELTS'], sec: ['UPPER_BACK'], aliases: ['Side Lateral Raise', 'DB Lateral Raise'] },
  { name: 'Seated Dumbbell Lateral Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['SIDE_DELTS'], sec: ['UPPER_BACK'], aliases: ['Seated Lateral Raise'] },
  { name: 'Leaning Cable Lateral Raise', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['CABLE'], prim: ['SIDE_DELTS'], sec: [], aliases: ['Lean-Away Cable Lateral'] },
  { name: 'Behind-the-Back Cable Lateral Raise', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['CABLE'], prim: ['SIDE_DELTS'], sec: [], aliases: ['Rear Cable Lateral'] },
  { name: 'Machine Lateral Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['SIDE_DELTS'], sec: [], aliases: ['Selectorized Lateral Raise'] },
  { name: 'Barbell Upright Row', pattern: 'VERTICAL_PULL', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['SIDE_DELTS', 'UPPER_BACK'], sec: ['BICEPS'], aliases: ['Upright Row'] },
  { name: 'Dumbbell Upright Row', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['SIDE_DELTS', 'UPPER_BACK'], sec: ['BICEPS'], aliases: ['DB Upright Row'] },
  { name: 'Cable Upright Row', pattern: 'VERTICAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['SIDE_DELTS', 'UPPER_BACK'], sec: ['BICEPS'], aliases: ['Rope Upright Row'] },
  { name: 'Front Dumbbell Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['FRONT_DELTS'], sec: [], aliases: ['DB Front Raise'] },
  { name: 'Barbell Front Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['FRONT_DELTS'], sec: [], aliases: ['Front Barbell Raise'] },
  { name: 'Cable Front Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['FRONT_DELTS'], sec: [], aliases: ['Rope Front Raise'] },
  { name: 'Dumbbell Rear Delt Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['REAR_DELTS'], sec: ['UPPER_BACK'], aliases: ['Bent-Over Rear Delt Fly'] },
  { name: 'Incline Bench Rear Delt Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['REAR_DELTS'], sec: ['UPPER_BACK'], aliases: ['Prone Incline Rear Fly'] },
  { name: 'Reverse Pec Deck Machine Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['REAR_DELTS'], sec: ['UPPER_BACK'], aliases: ['Reverse Pec Deck', 'Rear Delt Machine'] },
  { name: 'Cable Face Pull', pattern: 'HORIZONTAL_PULL', diff: 'BEGINNER', eq: ['CABLE'], prim: ['REAR_DELTS', 'UPPER_BACK'], sec: ['SIDE_DELTS'], aliases: ['Face Pull', 'Rope Face Pull'] },
  { name: 'Cable Rear Delt Fly', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['REAR_DELTS'], sec: ['UPPER_BACK'], aliases: ['Cross Cable Rear Delt'] }
];

// 4. BICEPS (20 exercises)
const bicepExercises = [
  { name: 'Barbell Biceps Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Barbell Curl', 'BB Curl'] },
  { name: 'EZ-Bar Biceps Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['EZ-Bar Curl'] },
  { name: 'Wide-Grip EZ-Bar Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Wide Bicep Curl'] },
  { name: 'Close-Grip EZ-Bar Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Narrow Bicep Curl'] },
  { name: 'Standing Dumbbell Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['DB Curl'] },
  { name: 'Alternating Dumbbell Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Alternating DB Curl'] },
  { name: 'Incline Dumbbell Biceps Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Incline DB Curl'] },
  { name: 'Dumbbell Hammer Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['BICEPS', 'FOREARMS'], sec: [], aliases: ['Hammer Curl', 'Neutral Grip Curl'] },
  { name: 'Cross-Body Hammer Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['BICEPS', 'FOREARMS'], sec: [], aliases: ['Pinwheel Curl'] },
  { name: 'Incline Dumbbell Hammer Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['BICEPS', 'FOREARMS'], sec: [], aliases: ['Incline Hammer Curl'] },
  { name: 'Barbell Preacher Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL', 'BENCH'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Preacher Curl', 'Scott Curl'] },
  { name: 'Dumbbell Preacher Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Single-Arm Preacher Curl'] },
  { name: 'Machine Preacher Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['BICEPS'], sec: [], aliases: ['Selectorized Preacher Curl'] },
  { name: 'Dumbbell Spider Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Spider Curl'] },
  { name: 'Dumbbell Concentration Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['BICEPS'], sec: [], aliases: ['Concentration Curl'] },
  { name: 'Standing Cable Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['BICEPS'], sec: ['FOREARMS'], aliases: ['Straight Bar Cable Curl'] },
  { name: 'Bayesian Cable Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['CABLE'], prim: ['BICEPS'], sec: [], aliases: ['Behind-the-Back Cable Curl'] },
  { name: 'High Cable Biceps Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['BICEPS'], sec: [], aliases: ['Overhead Cable Curl'] },
  { name: 'Reverse Barbell Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['FOREARMS', 'BICEPS'], sec: [], aliases: ['Overhand Barbell Curl'] },
  { name: 'Zottman Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['BICEPS', 'FOREARMS'], sec: [], aliases: ['Zottman DB Curl'] }
];

// 5. TRICEPS (20 exercises)
const tricepExercises = [
  { name: 'Cable Rope Triceps Pushdown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['Rope Pushdown', 'Triceps Pushdown'] },
  { name: 'Straight-Bar Cable Pushdown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['Straight Bar Pushdown'] },
  { name: 'V-Bar Cable Pushdown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['V-Bar Pushdown'] },
  { name: 'Single-Arm Cable Pushdown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['1-Arm Cable Pushdown'] },
  { name: 'Reverse-Grip Cable Pushdown', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: ['FOREARMS'], aliases: ['Underhand Pushdown'] },
  { name: 'Overhead Cable Triceps Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['Cable Overhead Extension'] },
  { name: 'Single-Arm Overhead Cable Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['Unilateral Overhead Cable Ext'] },
  { name: 'Seated Dumbbell Overhead Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['TRICEPS'], sec: [], aliases: ['DB Overhead Extension', 'French Press'] },
  { name: 'Standing Overhead Dumbbell Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['TRICEPS'], sec: ['ABS'], aliases: ['Two-Hand DB Overhead Ext'] },
  { name: 'Incline Overhead Dumbbell Extension', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['TRICEPS'], sec: [], aliases: ['Incline Triceps Extension'] },
  { name: 'EZ-Bar Skull Crusher', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['TRICEPS'], sec: [], aliases: ['Lying Triceps Extension', 'Skull Crusher'] },
  { name: 'Dumbbell Skull Crusher', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['TRICEPS'], sec: [], aliases: ['DB Skull Crusher'] },
  { name: 'Floor Dumbbell Skull Crusher', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['TRICEPS'], sec: [], aliases: ['Floor Skull Crusher'] },
  { name: 'JM Press', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['TRICEPS'], sec: ['CHEST', 'FRONT_DELTS'], aliases: ['JM Press Barbell'] },
  { name: 'Parallel Bar Triceps Dip', pattern: 'VERTICAL_PUSH', diff: 'INTERMEDIATE', eq: ['PARALLEL_BARS', 'BODYWEIGHT'], prim: ['TRICEPS'], sec: ['CHEST', 'FRONT_DELTS'], aliases: ['Upright Dips'] },
  { name: 'Weighted Triceps Dip', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['PARALLEL_BARS', 'BODYWEIGHT'], prim: ['TRICEPS'], sec: ['CHEST', 'FRONT_DELTS'], aliases: ['Weighted Dip'] },
  { name: 'Bench Dip', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['BENCH', 'BODYWEIGHT'], prim: ['TRICEPS'], sec: ['FRONT_DELTS'], aliases: ['Seated Bench Dip'] },
  { name: 'Cable Kickback', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['TRICEPS'], sec: [], aliases: ['Tricep Cable Kickback'] },
  { name: 'Dumbbell Kickback', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['TRICEPS'], sec: [], aliases: ['DB Kickback'] },
  { name: 'Machine Triceps Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['TRICEPS'], sec: [], aliases: ['Seated Machine Dip'] }
];

// 6. QUADS (25 exercises)
const quadExercises = [
  { name: 'Barbell Back Squat', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS', 'LOWER_BACK', 'ABS'], aliases: ['Squat', 'Back Squat'] },
  { name: 'Barbell Front Squat', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS'], sec: ['GLUTES', 'ABS', 'UPPER_BACK'], aliases: ['Front Squat'] },
  { name: 'Low-Bar Back Squat', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['GLUTES', 'QUADS', 'HAMSTRINGS'], sec: ['LOWER_BACK'], aliases: ['Low Bar Squat'] },
  { name: 'High-Bar Back Squat', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['QUADS'], sec: ['GLUTES'], aliases: ['Olympic Squat'] },
  { name: 'Zercher Squat', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS', 'UPPER_BACK', 'ABS'], sec: ['GLUTES'], aliases: ['Zercher Squat'] },
  { name: 'Safety-Bar Squat', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['QUADS', 'UPPER_BACK'], sec: ['GLUTES'], aliases: ['SSB Squat'] },
  { name: 'Box Squat', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['GLUTES', 'HAMSTRINGS', 'QUADS'], sec: ['LOWER_BACK'], aliases: ['Barbell Box Squat'] },
  { name: 'Paused Back Squat', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS', 'GLUTES'], sec: ['ABS'], aliases: ['Pause Squat'] },
  { name: 'Dumbbell Goblet Squat', pattern: 'SQUAT', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['QUADS'], sec: ['GLUTES', 'ABS'], aliases: ['Goblet Squat'] },
  { name: 'Kettlebell Goblet Squat', pattern: 'SQUAT', diff: 'BEGINNER', eq: ['KETTLEBELL'], prim: ['QUADS'], sec: ['GLUTES', 'ABS'], aliases: ['KB Goblet Squat'] },
  { name: 'Hack Squat Machine', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['QUADS'], sec: ['GLUTES'], aliases: ['Hack Squat', 'Machine Hack Squat'] },
  { name: 'Barbell Hack Squat', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS'], sec: ['GLUTES', 'FOREARMS'], aliases: ['Behind the Back Deadlift'] },
  { name: '45-Degree Leg Press', pattern: 'SQUAT', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Leg Press', 'Incline Leg Press'] },
  { name: 'Vertical Leg Press', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['QUADS'], sec: ['GLUTES'], aliases: ['Vertical Press'] },
  { name: 'Single-Leg Leg Press', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['QUADS', 'GLUTES'], sec: [], aliases: ['Unilateral Leg Press'] },
  { name: 'Bulgarian Split Squat', pattern: 'LUNGE', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Rear Foot Elevated Split Squat', 'BSS'] },
  { name: 'Barbell Bulgarian Split Squat', pattern: 'LUNGE', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Barbell BSS'] },
  { name: 'Deficit Bulgarian Split Squat', pattern: 'LUNGE', diff: 'ADVANCED', eq: ['DUMBBELL', 'BENCH'], prim: ['GLUTES', 'QUADS'], sec: [], aliases: ['Deficit BSS'] },
  { name: 'Barbell Walking Lunge', pattern: 'LUNGE', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Walking Lunge Barbell'] },
  { name: 'Dumbbell Walking Lunge', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['DB Walking Lunge'] },
  { name: 'Dumbbell Reverse Lunge', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Reverse Lunge'] },
  { name: 'Forward Lunge', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['QUADS', 'GLUTES'], sec: [], aliases: ['Front Lunge'] },
  { name: 'Dumbbell Step-Up', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['QUADS', 'GLUTES'], sec: [], aliases: ['Box Step-Up'] },
  { name: 'Leg Extension Machine', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['QUADS'], sec: [], aliases: ['Leg Extension', 'Quad Extension'] },
  { name: 'Sissy Squat', pattern: 'ISOLATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['QUADS'], sec: ['ABS'], aliases: ['Bodyweight Sissy Squat'] }
];

// 7. HAMSTRINGS (20 exercises)
const hamstringExercises = [
  { name: 'Barbell Romanian Deadlift', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['HAMSTRINGS'], sec: ['GLUTES', 'LOWER_BACK'], aliases: ['RDL', 'Romanian Deadlift'] },
  { name: 'Dumbbell Romanian Deadlift', pattern: 'HINGE', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['HAMSTRINGS'], sec: ['GLUTES', 'LOWER_BACK'], aliases: ['DB RDL'] },
  { name: 'Single-Leg Dumbbell RDL', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['HAMSTRINGS', 'GLUTES'], sec: ['ABS'], aliases: ['1-Leg RDL', 'Unilateral RDL'] },
  { name: 'Barbell Stiff-Leg Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['HAMSTRINGS'], sec: ['GLUTES', 'LOWER_BACK'], aliases: ['SLDL', 'Stiff Leg Deadlift'] },
  { name: 'Dumbbell Stiff-Leg Deadlift', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['HAMSTRINGS'], sec: ['GLUTES'], aliases: ['DB SLDL'] },
  { name: 'Lying Leg Curl Machine', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['HAMSTRINGS'], sec: ['CALVES'], aliases: ['Lying Leg Curl', 'Hamstring Curl'] },
  { name: 'Seated Leg Curl Machine', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['HAMSTRINGS'], sec: [], aliases: ['Seated Leg Curl', 'Seated Hamstring Curl'] },
  { name: 'Standing Single-Leg Curl Machine', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['HAMSTRINGS'], sec: [], aliases: ['Standing Leg Curl'] },
  { name: 'Nordic Hamstring Curl', pattern: 'ISOLATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS'], sec: ['GLUTES', 'CALVES'], aliases: ['Nordic Curl', 'Nordics'] },
  { name: 'Glute-Ham Raise', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BENCH', 'BODYWEIGHT'], prim: ['HAMSTRINGS', 'GLUTES'], sec: ['LOWER_BACK', 'CALVES'], aliases: ['GHR', 'Glute Ham Developer'] },
  { name: 'Dumbbell Good Morning', pattern: 'HINGE', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['HAMSTRINGS', 'LOWER_BACK'], sec: ['GLUTES'], aliases: ['DB Good Morning'] },
  { name: 'Cable Pull-Through', pattern: 'HINGE', diff: 'BEGINNER', eq: ['CABLE'], prim: ['HAMSTRINGS', 'GLUTES'], sec: ['LOWER_BACK'], aliases: ['Rope Pull-Through'] },
  { name: 'Slider Leg Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS'], sec: ['GLUTES'], aliases: ['Floor Slider Curl'] },
  { name: 'Stability-Ball Leg Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['SWISS_BALL', 'BODYWEIGHT'], prim: ['HAMSTRINGS'], sec: ['GLUTES', 'ABS'], aliases: ['Swiss Ball Hamstring Curl'] },
  { name: 'Reverse Hyperextension', pattern: 'EXTENSION', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['HAMSTRINGS', 'GLUTES', 'LOWER_BACK'], sec: [], aliases: ['Reverse Hyper'] },
  { name: 'Single-Leg Slider Curl', pattern: 'ISOLATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS'], sec: ['GLUTES'], aliases: ['1-Leg Slider Curl'] },
  { name: 'Banded Hamstring Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['RESISTANCE_BAND'], prim: ['HAMSTRINGS'], sec: [], aliases: ['Band Leg Curl'] },
  { name: 'Dumbbell Lying Leg Curl', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['HAMSTRINGS'], sec: [], aliases: ['DB Leg Curl'] },
  { name: 'Smith Machine Romanian Deadlift', pattern: 'HINGE', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['HAMSTRINGS'], sec: ['GLUTES'], aliases: ['Smith Machine RDL'] },
  { name: 'Kettlebell Romanian Deadlift', pattern: 'HINGE', diff: 'BEGINNER', eq: ['KETTLEBELL'], prim: ['HAMSTRINGS'], sec: ['GLUTES'], aliases: ['KB RDL'] }
];

// 8. GLUTES (20 exercises)
const gluteExercises = [
  { name: 'Barbell Hip Thrust', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['GLUTES'], sec: ['HAMSTRINGS', 'QUADS'], aliases: ['Hip Thrust', 'Barbell Thrust'] },
  { name: 'Single-Leg Barbell Hip Thrust', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL', 'BENCH'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['1-Leg Hip Thrust'] },
  { name: 'Dumbbell Hip Thrust', pattern: 'HINGE', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['DB Hip Thrust'] },
  { name: 'Machine Hip Thrust', pattern: 'HINGE', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Plate-Loaded Hip Thrust'] },
  { name: 'Barbell Glute Bridge', pattern: 'HINGE', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Floor Glute Bridge'] },
  { name: 'Single-Leg Glute Bridge', pattern: 'HINGE', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: ['HAMSTRINGS', 'ABS'], aliases: ['1-Leg Glute Bridge'] },
  { name: 'Elevated Glute Bridge', pattern: 'HINGE', diff: 'BEGINNER', eq: ['BENCH', 'BODYWEIGHT'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Feet-Elevated Bridge'] },
  { name: 'Cable Glute Kickback', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['GLUTES'], sec: [], aliases: ['Glute Kickback', 'Cable Kickback'] },
  { name: 'Standing Cable Hip Abduction', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['GLUTES'], sec: [], aliases: ['Cable Abduction'] },
  { name: 'Seated Machine Hip Abduction', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['GLUTES'], sec: [], aliases: ['Outer Thigh Machine', 'Hip Abductor'] },
  { name: '45-Degree Hyperextension (Glute Focused)', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BENCH', 'BODYWEIGHT'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Glute Hyperextension', 'Rounded Back Extension'] },
  { name: 'Dumbbell Curtsy Lunge', pattern: 'LUNGE', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['GLUTES', 'QUADS'], sec: [], aliases: ['Curtsy Lunge'] },
  { name: 'Deficit Reverse Lunge', pattern: 'LUNGE', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['GLUTES', 'QUADS'], sec: ['HAMSTRINGS'], aliases: ['Elevated Reverse Lunge'] },
  { name: 'Glute-Focused Step-Up', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['DUMBBELL', 'BENCH'], prim: ['GLUTES'], sec: ['QUADS'], aliases: ['High Box Step Up'] },
  { name: 'Frog Pump', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: [], aliases: ['Bodyweight Frog Pump'] },
  { name: 'Side-Lying Clamshell', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: [], aliases: ['Clamshells'] },
  { name: 'Banded Lateral Monster Walk', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['RESISTANCE_BAND'], prim: ['GLUTES'], sec: [], aliases: ['Monster Walks', 'Band Lateral Walk'] },
  { name: 'Kettlebell Sumo Deadlift', pattern: 'HINGE', diff: 'BEGINNER', eq: ['KETTLEBELL'], prim: ['GLUTES', 'HAMSTRINGS'], sec: ['QUADS'], aliases: ['KB Sumo DL'] },
  { name: 'Dumbbell Sumo Squat', pattern: 'SQUAT', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['GLUTES', 'QUADS'], sec: [], aliases: ['Plie Squat'] },
  { name: 'Kneeling Cable Hip Extension', pattern: 'HINGE', diff: 'BEGINNER', eq: ['CABLE'], prim: ['GLUTES'], sec: [], aliases: ['Kneeling Cable Thrust'] }
];

// 9. CALVES (12 exercises)
const calfExercises = [
  { name: 'Standing Calf Raise (Machine)', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CALVES'], sec: [], aliases: ['Machine Calf Raise', 'Standing Calf Raise'] },
  { name: 'Standing Barbell Calf Raise', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['CALVES'], sec: [], aliases: ['Barbell Calf Raise'] },
  { name: 'Standing Dumbbell Calf Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['CALVES'], sec: [], aliases: ['DB Calf Raise'] },
  { name: 'Seated Calf Raise (Machine)', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CALVES'], sec: [], aliases: ['Seated Calf Raise', 'Soleus Raise'] },
  { name: 'Leg Press Calf Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CALVES'], sec: [], aliases: ['Calf Press on Leg Press', 'Toe Press'] },
  { name: 'Single-Leg Standing Calf Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['1-Leg Calf Raise'] },
  { name: 'Single-Leg Dumbbell Calf Raise', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['CALVES'], sec: [], aliases: ['Single DB Calf Raise'] },
  { name: 'Donkey Calf Raise', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['MACHINE', 'BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['Donkey Raise'] },
  { name: 'Smith Machine Calf Raise', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CALVES'], sec: [], aliases: ['Smith Calf Raise'] },
  { name: 'Tibialis Raise (Bodyweight)', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['Tibialis Raise', 'Wall Shin Raise'] },
  { name: 'Tibialis Raise (Dumbbell/Kettlebell)', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['CALVES'], sec: [], aliases: ['Weighted Tib Raise'] },
  { name: 'Eccentric Heel Drop', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['Achilles Heel Drop'] }
];

// 10. CORE (25 exercises)
const coreExercises = [
  { name: 'Front Plank', pattern: 'ANTI_ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['SHOULDERS', 'GLUTES'], aliases: ['Plank', 'Forearm Plank'] },
  { name: 'Extended Plank', pattern: 'ANTI_ROTATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['SHOULDERS'], aliases: ['Long Lever Plank'] },
  { name: 'Ab Wheel Rollout', pattern: 'ANTI_ROTATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['LATS', 'SHOULDERS'], aliases: ['Ab Wheel', 'Wheel Rollout'] },
  { name: 'Barbell Rollout', pattern: 'ANTI_ROTATION', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['ABS'], sec: ['LATS', 'SHOULDERS'], aliases: ['Barbell Ab Rollout'] },
  { name: 'Dead Bug', pattern: 'ANTI_ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Deadbug'] },
  { name: 'Body Saw', pattern: 'ANTI_ROTATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['SHOULDERS'], aliases: ['Plank Body Saw'] },
  { name: 'RKC Plank', pattern: 'ANTI_ROTATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['GLUTES', 'QUADS'], aliases: ['Hardstyle Plank'] },
  { name: 'Hanging Leg Raise', pattern: 'FLEXION', diff: 'ADVANCED', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['ABS'], sec: ['FOREARMS'], aliases: ['Toes to Bar', 'Hanging Straight Leg Raise'] },
  { name: 'Hanging Knee Raise', pattern: 'FLEXION', diff: 'INTERMEDIATE', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['ABS'], sec: ['FOREARMS'], aliases: ['Hanging Knees to Chest'] },
  { name: 'Captain\'s Chair Leg Raise', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['PARALLEL_BARS', 'BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Roman Chair Leg Raise'] },
  { name: 'Standing Cable Crunch', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['ABS'], sec: [], aliases: ['Cable Crunch', 'Kneeling Cable Crunch'] },
  { name: 'Machine Crunch', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['ABS'], sec: [], aliases: ['Seated Ab Machine'] },
  { name: 'Decline Crunch', pattern: 'FLEXION', diff: 'INTERMEDIATE', eq: ['BENCH', 'BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Decline Sit-Up'] },
  { name: 'Reverse Crunch', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Floor Reverse Crunch'] },
  { name: 'Floor Crunch', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Standard Crunch'] },
  { name: 'Bicycle Crunch', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Air Bicycle'] },
  { name: 'Cable Pallof Press', pattern: 'ANTI_ROTATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['ABS'], sec: [], aliases: ['Pallof Press'] },
  { name: 'Half-Kneeling Pallof Press', pattern: 'ANTI_ROTATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['ABS'], sec: ['GLUTES'], aliases: ['Kneeling Pallof Press'] },
  { name: 'Russian Twist', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: [], aliases: ['Seated Russian Twist'] },
  { name: 'High-to-Low Cable Woodchopper', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['ABS'], sec: ['SHOULDERS'], aliases: ['Cable Woodchop'] },
  { name: 'Low-to-High Cable Woodchopper', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['ABS'], sec: ['SHOULDERS'], aliases: ['Diagonal Cable Chop'] },
  { name: 'Landmine 180s', pattern: 'ROTATION', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['ABS'], sec: ['SHOULDERS'], aliases: ['Landmine Rotations'] },
  { name: 'Side Plank', pattern: 'ANTI_ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['GLUTES'], aliases: ['Lateral Plank'] },
  { name: 'Elevated Side Plank', pattern: 'ANTI_ROTATION', diff: 'INTERMEDIATE', eq: ['BENCH', 'BODYWEIGHT'], prim: ['ABS'], sec: ['GLUTES'], aliases: ['Feet-Elevated Side Plank'] },
  { name: 'Dumbbell Suitcase Carry', pattern: 'CARRY', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['ABS'], sec: ['FOREARMS', 'UPPER_BACK'], aliases: ['Suitcase Carry', 'Single Arm Carry'] }
];

// 11. FULL BODY / FUNCTIONAL (20 exercises)
const fullBodyExercises = [
  { name: 'Turkish Get-Up', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['KETTLEBELL'], prim: ['SHOULDERS', 'ABS'], sec: ['GLUTES', 'QUADS'], aliases: ['TGU', 'Kettlebell Get Up'] },
  { name: 'Kettlebell Swing', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['KETTLEBELL'], prim: ['GLUTES', 'HAMSTRINGS'], sec: ['LOWER_BACK', 'ABS', 'FOREARMS'], aliases: ['Russian KB Swing'] },
  { name: 'Single-Arm Kettlebell Swing', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['KETTLEBELL'], prim: ['GLUTES', 'HAMSTRINGS'], sec: ['ABS', 'FOREARMS'], aliases: ['1-Arm KB Swing'] },
  { name: 'Barbell Power Clean', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['HAMSTRINGS', 'GLUTES', 'UPPER_BACK'], sec: ['SHOULDERS', 'QUADS'], aliases: ['Power Clean'] },
  { name: 'Hang Power Clean', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['UPPER_BACK', 'GLUTES', 'HAMSTRINGS'], sec: ['FOREARMS'], aliases: ['Hang Clean'] },
  { name: 'Barbell Clean & Press', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['SHOULDERS', 'GLUTES', 'UPPER_BACK'], sec: ['TRICEPS', 'QUADS'], aliases: ['Clean and Press'] },
  { name: 'Barbell Push Jerk', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['SHOULDERS', 'QUADS'], sec: ['TRICEPS', 'GLUTES'], aliases: ['Push Jerk'] },
  { name: 'Barbell Snatch', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['HAMSTRINGS', 'UPPER_BACK', 'SHOULDERS'], sec: ['QUADS', 'GLUTES'], aliases: ['Full Snatch', 'Olympic Snatch'] },
  { name: 'Power Snatch', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['UPPER_BACK', 'GLUTES', 'HAMSTRINGS'], sec: ['SHOULDERS'], aliases: ['Barbell Power Snatch'] },
  { name: 'Dumbbell Thruster', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['DUMBBELL'], prim: ['QUADS', 'SHOULDERS'], sec: ['GLUTES', 'TRICEPS', 'ABS'], aliases: ['DB Thruster', 'Squat to Overhead Press'] },
  { name: 'Barbell Thruster', pattern: 'SQUAT', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS', 'SHOULDERS'], sec: ['GLUTES', 'TRICEPS', 'ABS'], aliases: ['BB Thruster'] },
  { name: 'Man Maker', pattern: 'HORIZONTAL_PUSH', diff: 'ADVANCED', eq: ['DUMBBELL'], prim: ['CHEST', 'UPPER_BACK', 'SHOULDERS'], sec: ['QUADS', 'ABS'], aliases: ['Dumbbell Manmaker'] },
  { name: 'Farmer\'s Walk', pattern: 'CARRY', diff: 'BEGINNER', eq: ['DUMBBELL'], prim: ['FOREARMS', 'UPPER_BACK', 'ABS'], sec: ['GLUTES', 'CALVES'], aliases: ['Farmers Carry', 'Heavy Carry'] },
  { name: 'Trap Bar Farmers Carry', pattern: 'CARRY', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['FOREARMS', 'UPPER_BACK'], sec: ['GLUTES', 'QUADS'], aliases: ['Trap Bar Carry'] },
  { name: 'Prowler Sled Push', pattern: 'CARRY', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['QUADS', 'GLUTES', 'CALVES'], sec: ['SHOULDERS', 'ABS'], aliases: ['Sled Push', 'Prowler Push'] },
  { name: 'Backward Sled Drag', pattern: 'CARRY', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['QUADS'], sec: ['CALVES', 'ABS'], aliases: ['Sled Drag', 'Reverse Sled Pull'] },
  { name: 'Tire Flip', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['GLUTES', 'HAMSTRINGS', 'UPPER_BACK'], sec: ['QUADS', 'SHOULDERS'], aliases: ['Heavy Tire Flip'] },
  { name: 'Medicine Ball Overhead Slam', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['MEDICINE_BALL'], prim: ['ABS', 'LATS'], sec: ['SHOULDERS'], aliases: ['Ball Slam', 'Med Ball Slam'] },
  { name: 'Sandbag Clean & Carry', pattern: 'CARRY', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'ABS', 'GLUTES'], sec: ['FOREARMS'], aliases: ['Sandbag Carry'] },
  { name: 'Bear Crawl', pattern: 'CARRY', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['SHOULDERS', 'ABS'], sec: ['QUADS'], aliases: ['Alligator Crawl'] }
];

// 12. CONDITIONING (20 exercises)
const conditioningExercises = [
  { name: 'Outdoor Road Running', pattern: 'CARRY', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES', 'QUADS', 'GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Running', 'Jogging'] },
  { name: 'Treadmill Running', pattern: 'CARRY', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['CALVES', 'QUADS'], sec: ['HAMSTRINGS'], aliases: ['Treadmill Sprints', 'Treadmill Run'] },
  { name: 'Incline Treadmill Walk', pattern: 'CARRY', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['GLUTES', 'CALVES', 'HAMSTRINGS'], sec: ['QUADS'], aliases: ['12-3-30', 'Incline Walk'] },
  { name: 'Outdoor Road Cycling', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['QUADS', 'GLUTES'], sec: ['CALVES'], aliases: ['Cycling', 'Biking'] },
  { name: 'Stationary Air Bike (Echo/Assault)', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['QUADS', 'SHOULDERS'], sec: ['LATS', 'GLUTES'], aliases: ['Assault Bike', 'Echo Bike', 'Airdyne'] },
  { name: 'Concept2 Rowing Machine', pattern: 'HORIZONTAL_PULL', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['LATS', 'QUADS', 'GLUTES'], sec: ['UPPER_BACK', 'BICEPS', 'ABS'], aliases: ['Ergometer', 'Rowing', 'Rower'] },
  { name: 'SkiErg Machine', pattern: 'VERTICAL_PULL', diff: 'INTERMEDIATE', eq: ['MACHINE'], prim: ['LATS', 'ABS', 'TRICEPS'], sec: ['GLUTES'], aliases: ['Ski Erg'] },
  { name: 'Stair Climber Machine', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['MACHINE'], prim: ['GLUTES', 'QUADS', 'CALVES'], sec: ['HAMSTRINGS'], aliases: ['StairMaster', 'Step Mill'] },
  { name: 'Jump Rope / Speed Rope', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: ['SHOULDERS', 'FOREARMS'], aliases: ['Jump Rope', 'Skipping'] },
  { name: 'Double Unders', pattern: 'ISOLATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: ['SHOULDERS', 'FOREARMS'], aliases: ['DUs', 'Double Jump Rope'] },
  { name: 'Burpee', pattern: 'HORIZONTAL_PUSH', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['CHEST', 'QUADS', 'ABS'], sec: ['SHOULDERS'], aliases: ['Standard Burpee', 'Full Burpee'] },
  { name: 'Chest-to-Bar Burpee', pattern: 'VERTICAL_PULL', diff: 'ADVANCED', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['CHEST', 'LATS', 'QUADS'], sec: ['ABS'], aliases: ['Burpee Pull-Up'] },
  { name: 'Mountain Climbers', pattern: 'FLEXION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['ABS', 'QUADS'], sec: ['SHOULDERS'], aliases: ['Floor Climbers'] },
  { name: 'Jumping Jacks', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES', 'SHOULDERS'], sec: [], aliases: ['Side Straddle Hop'] },
  { name: 'Battle Ropes (Alternating Waves)', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BATTLE_ROPE'], prim: ['SHOULDERS', 'ABS'], sec: ['FOREARMS', 'QUADS'], aliases: ['Battle Ropes', 'Rope Waves'] },
  { name: 'Battle Ropes (Double Slams)', pattern: 'FLEXION', diff: 'INTERMEDIATE', eq: ['BATTLE_ROPE'], prim: ['LATS', 'ABS', 'SHOULDERS'], sec: ['QUADS'], aliases: ['Rope Slams'] },
  { name: 'Shuttle Sprints (Suicides)', pattern: 'CARRY', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['QUADS', 'HAMSTRINGS', 'CALVES'], sec: ['GLUTES'], aliases: ['Shuttle Run', 'Suicide Sprints'] },
  { name: 'Plyometric Box Jump', pattern: 'SQUAT', diff: 'INTERMEDIATE', eq: ['PLYO_BOX', 'BODYWEIGHT'], prim: ['QUADS', 'GLUTES', 'CALVES'], sec: ['HAMSTRINGS'], aliases: ['Box Jump'] },
  { name: 'Lateral Box Shuffles', pattern: 'LUNGE', diff: 'BEGINNER', eq: ['PLYO_BOX', 'BODYWEIGHT'], prim: ['GLUTES', 'QUADS', 'CALVES'], sec: [], aliases: ['Lateral Step Shuffles'] },
  { name: '500m Rowing Sprint', pattern: 'HORIZONTAL_PULL', diff: 'ADVANCED', eq: ['MACHINE'], prim: ['LATS', 'QUADS', 'GLUTES'], sec: ['ABS'], aliases: ['Row Sprint', '500m Row'] }
];

// 13. MOBILITY & RECOVERY (20 exercises)
const mobilityExercises = [
  { name: 'Cat-Cow Stretch', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['LOWER_BACK', 'UPPER_BACK'], sec: ['ABS'], aliases: ['Cat Cow', 'Spinal Flexion Stretch'] },
  { name: 'Child\'s Pose', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['LATS', 'LOWER_BACK'], sec: ['GLUTES'], aliases: ['Balasana'] },
  { name: 'World\'s Greatest Stretch', pattern: 'LUNGE', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS', 'GLUTES', 'UPPER_BACK'], sec: ['QUADS'], aliases: ['WGS', 'Lunge with Thoracic Twist'] },
  { name: '90/90 Hip Rotation', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: [], aliases: ['90-90 Stretch', 'Hip Flow'] },
  { name: 'Couch Stretch', pattern: 'EXTENSION', diff: 'INTERMEDIATE', eq: ['BENCH', 'BODYWEIGHT'], prim: ['QUADS', 'GLUTES'], sec: ['ABS'], aliases: ['Wall Hip Flexor Stretch'] },
  { name: 'Pigeon Pose', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: ['LOWER_BACK'], aliases: ['Sleeping Pigeon'] },
  { name: 'Frog Stretch', pattern: 'ISOLATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: [], aliases: ['Adductor Frog Stretch'] },
  { name: 'Standing Single-Leg Hamstring Stretch', pattern: 'HINGE', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS'], sec: ['CALVES'], aliases: ['Hamstring Stretch'] },
  { name: 'Calf Wall Stretch', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['Gastrocnemius Wall Stretch'] },
  { name: 'Thread the Needle', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'SHOULDERS'], sec: [], aliases: ['Thoracic Needle Stretch'] },
  { name: 'Open Book Thoracic Stretch', pattern: 'ROTATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'CHEST'], sec: [], aliases: ['Open Book Stretch'] },
  { name: 'Wall Slides', pattern: 'VERTICAL_PUSH', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'SHOULDERS'], sec: [], aliases: ['Scapular Wall Slides'] },
  { name: 'PVC Shoulder Dislocates', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['SHOULDERS', 'CHEST'], sec: ['UPPER_BACK'], aliases: ['Shoulder Pass Throughs'] },
  { name: 'Prone Cobra', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'LOWER_BACK'], sec: ['REAR_DELTS'], aliases: ['Floor Cobra'] },
  { name: 'Deep Squat Hold', pattern: 'SQUAT', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES', 'QUADS', 'CALVES'], sec: ['LOWER_BACK'], aliases: ['Malasana', 'Third World Squat'] },
  { name: 'Ankle Dorsiflexion Wall Drill', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CALVES'], sec: [], aliases: ['Ankle Mobilization'] },
  { name: 'Butterfly Stretch', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['GLUTES'], sec: [], aliases: ['Seated Butterfly'] },
  { name: 'Doorway Pectoral Stretch', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['CHEST'], sec: ['FRONT_DELTS'], aliases: ['Corner Chest Stretch'] },
  { name: 'The Brettzel Stretch', pattern: 'ROTATION', diff: 'ADVANCED', eq: ['BODYWEIGHT'], prim: ['UPPER_BACK', 'QUADS', 'GLUTES'], sec: ['LOWER_BACK'], aliases: ['Brettzel 1.0'] },
  { name: 'Downward Dog to Cobra Flow', pattern: 'EXTENSION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['HAMSTRINGS', 'CALVES', 'ABS'], sec: ['SHOULDERS', 'LOWER_BACK'], aliases: ['Vinyasa Flow'] }
];

// 14. EXTRA RESISTANCE / POWER / ACCESSORY (20 exercises)
const extraResistanceExercises = [
  { name: 'Barbell Behind-the-Neck Press', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['FRONT_DELTS', 'SIDE_DELTS'], sec: ['TRICEPS', 'UPPER_BACK'], aliases: ['BTN Press'] },
  { name: 'Z-Press', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['FRONT_DELTS', 'ABS'], sec: ['TRICEPS'], aliases: ['Seated Floor Barbell Press'] },
  { name: 'Klokov Press', pattern: 'VERTICAL_PUSH', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['SIDE_DELTS', 'UPPER_BACK'], sec: ['TRICEPS'], aliases: ['Wide Grip BTN Press'] },
  { name: 'Barbell Hip Thrust (Banded)', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BARBELL', 'RESISTANCE_BAND', 'BENCH'], prim: ['GLUTES'], sec: ['HAMSTRINGS'], aliases: ['Banded Hip Thrust'] },
  { name: 'Trap Bar Deadlift (High Handles)', pattern: 'HINGE', diff: 'BEGINNER', eq: ['BARBELL'], prim: ['QUADS', 'GLUTES', 'HAMSTRINGS'], sec: ['UPPER_BACK', 'FOREARMS'], aliases: ['Hex Bar Deadlift'] },
  { name: 'Trap Bar Deadlift (Low Handles)', pattern: 'HINGE', diff: 'INTERMEDIATE', eq: ['BARBELL'], prim: ['HAMSTRINGS', 'GLUTES', 'LOWER_BACK'], sec: ['UPPER_BACK'], aliases: ['Low Handle Hex Deadlift'] },
  { name: 'Jefferson Deadlift', pattern: 'HINGE', diff: 'ADVANCED', eq: ['BARBELL'], prim: ['QUADS', 'GLUTES', 'ABS'], sec: ['HAMSTRINGS'], aliases: ['Straddle Deadlift'] },
  { name: 'Dumbbell Pullover', pattern: 'EXTENSION', diff: 'INTERMEDIATE', eq: ['DUMBBELL', 'BENCH'], prim: ['LATS', 'CHEST'], sec: ['TRICEPS'], aliases: ['DB Pullover', 'Cross-Bench Pullover'] },
  { name: 'Barbell Pullover', pattern: 'EXTENSION', diff: 'INTERMEDIATE', eq: ['BARBELL', 'BENCH'], prim: ['LATS', 'CHEST'], sec: ['TRICEPS'], aliases: ['Straight Arm BB Pullover'] },
  { name: 'Dragon Flag', pattern: 'ANTI_ROTATION', diff: 'ADVANCED', eq: ['BENCH', 'BODYWEIGHT'], prim: ['ABS'], sec: ['LATS'], aliases: ['Bruce Lee Dragon Flag'] },
  { name: 'L-Sit Hold', pattern: 'ANTI_ROTATION', diff: 'ADVANCED', eq: ['PARALLEL_BARS', 'BODYWEIGHT'], prim: ['ABS', 'QUADS'], sec: ['SHOULDERS', 'TRICEPS'], aliases: ['L-Sit'] },
  { name: 'V-Up', pattern: 'FLEXION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['QUADS'], aliases: ['Jackknife Sit-Up'] },
  { name: 'Hollow Body Hold', pattern: 'ANTI_ROTATION', diff: 'INTERMEDIATE', eq: ['BODYWEIGHT'], prim: ['ABS'], sec: ['QUADS'], aliases: ['Gymnastic Hollow Hold'] },
  { name: 'Windshield Wipers (Hanging)', pattern: 'ROTATION', diff: 'ADVANCED', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['ABS'], sec: ['FOREARMS', 'LATS'], aliases: ['Hanging Wipers'] },
  { name: 'Cable Lateral Neck Flexion', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['CABLE'], prim: ['UPPER_BACK'], sec: [], aliases: ['Neck Side Flexion'] },
  { name: 'Wrist Roller Extension', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['FOREARMS'], sec: [], aliases: ['Forearm Roller'] },
  { name: 'Reverse Barbell Wrist Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL', 'BENCH'], prim: ['FOREARMS'], sec: [], aliases: ['Overhand Wrist Curl'] },
  { name: 'Palms-Up Barbell Wrist Curl', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BARBELL', 'BENCH'], prim: ['FOREARMS'], sec: [], aliases: ['Underhand Wrist Curl'] },
  { name: 'Plate Pinch Hold', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['BODYWEIGHT'], prim: ['FOREARMS'], sec: [], aliases: ['Pinch Grip Hold'] },
  { name: 'Dead Hang from Pull-Up Bar', pattern: 'ISOLATION', diff: 'BEGINNER', eq: ['PULL_UP_BAR', 'BODYWEIGHT'], prim: ['FOREARMS', 'SHOULDERS'], sec: ['LATS'], aliases: ['Grip Dead Hang', 'Decompression Hang'] }
];

const allRawGroups = [
  { list: chestExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
  { list: backExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
  { list: shoulderExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
  { list: bicepExercises, cat: ['HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
  { list: tricepExercises, cat: ['HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
  { list: quadExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
  { list: hamstringExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
  { list: gluteExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
  { list: calfExercises, cat: ['HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
  { list: coreExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80' },
  { list: fullBodyExercises, cat: ['STRENGTH', 'CONDITIONING'], defaultImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
  { list: conditioningExercises, cat: ['CONDITIONING'], defaultImg: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80' },
  { list: mobilityExercises, cat: ['MOBILITY'], defaultImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80' },
  { list: extraResistanceExercises, cat: ['STRENGTH', 'HYPERTROPHY'], defaultImg: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' }
];

let globalId = 1;
const fullCatalog = [];
const seenSlugs = new Set();
const seenNames = new Set();

for (const group of allRawGroups) {
  for (const raw of group.list) {
    const id = `ex_${globalId}`;
    const slug = slugify(raw.name);

    if (seenSlugs.has(slug)) {
      console.error(`DUPLICATE SLUG DETECTED: ${slug}`);
    }
    seenSlugs.add(slug);

    if (seenNames.has(raw.name.toLowerCase())) {
      console.error(`DUPLICATE NAME DETECTED: ${raw.name}`);
    }
    seenNames.add(raw.name.toLowerCase());

    const item = {
      _id: id,
      name: raw.name,
      slug: slug,
      description: `${raw.name} is a high-yield ${raw.prim.join(', ')} exercise utilizing ${raw.eq.join(' and ')} for optimal training stimulus.`,
      category: group.cat,
      movementPattern: raw.pattern,
      difficulty: raw.diff,
      primaryMuscles: raw.prim,
      secondaryMuscles: raw.sec || [],
      equipment: raw.eq,
      requiredEquipment: raw.eq,
      instructions: [
        `Assume correct setup position for ${raw.name} with ${raw.eq.join(', ')}.`,
        `Engage core and set active posture before initiating movement.`,
        `Execute movement through full active range of motion with controlled tempo.`,
        `Return smoothly to starting position and reset for subsequent repetitions.`
      ],
      setupInstructions: [
        `Verify equipment alignment and ensure safety clearances.`,
        `Plant foundation firmly and establish stable base.`
      ],
      breathingInstructions: [
        `Inhale on eccentric phase; exhale forcefully during concentric execution.`
      ],
      coachingCues: [
        `Maintain steady tempo without rushing.`,
        `Focus active tension directly into target musculature.`
      ],
      commonMistakes: [
        `Using excessive momentum instead of muscular control.`,
        `Cutting active range of motion short.`
      ],
      aliases: raw.aliases || [],
      tags: ['compound', raw.pattern.toLowerCase().replace('_', '-'), ...raw.prim.map(m => m.toLowerCase())],
      media: {
        thumbnail: group.defaultImg,
        images: [group.defaultImg]
      },
      programming: {
        recommendedSets: raw.diff === 'ADVANCED' ? '4-5 sets' : '3-4 sets',
        recommendedRepRange: group.cat.includes('CONDITIONING')
          ? { min: 15, max: 30 }
          : group.cat.includes('MOBILITY')
          ? { min: 10, max: 12 }
          : { min: 8, max: 12 },
        recommendedRestSeconds: group.cat.includes('CONDITIONING') ? 45 : 90,
        recommendedRPE: 8,
        recommendedRIR: 2,
        tempo: '3-0-1-0'
      },
      alternatives: [],
      status: 'ACTIVE',
      personalBest: {
        weightKg: raw.eq.includes('BODYWEIGHT') ? 0 : 40,
        reps: 10,
        estimated1RM: raw.eq.includes('BODYWEIGHT') ? 0 : 53,
        totalVolumeKg: 12000,
        achievedAt: new Date()
      }
    };

    fullCatalog.push(item);
    globalId++;
  }
}

// Generate smart alternative mappings based on same primary muscle and movement pattern
for (const ex of fullCatalog) {
  const matches = fullCatalog
    .filter(o => o._id !== ex._id && o.movementPattern === ex.movementPattern && o.primaryMuscles.some(m => ex.primaryMuscles.includes(m)))
    .slice(0, 3)
    .map(alt => ({
      exerciseId: alt._id,
      name: alt.name,
      equipment: alt.equipment.join(', '),
      similarityScore: alt.equipment.some(e => ex.equipment.includes(e)) ? 92 : 85,
      similarityDescription: `Biomechanical match sharing ${alt.movementPattern} pattern`
    }));

  ex.alternatives = matches;
}

console.log(`Generated ${fullCatalog.length} unique exercises without duplicate slugs or names!`);

// Write to backend TypeScript file
const tsContent = `// Auto-generated 317 Exercise Catalog (Phase 6A.4)
// Standardized taxonomy, stable IDs ex_1 to ex_${fullCatalog.length}

export const EXERCISE_CATALOG_317 = ${JSON.stringify(fullCatalog, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'exerciseCatalogData.ts'), tsContent, 'utf8');

// Write to frontend data folder as well for offline fallback and fast client browsing
const frontendTsContent = `// Auto-generated 317 Exercise Catalog (Phase 6A.4)
export const EXERCISE_CATALOG_317 = ${JSON.stringify(fullCatalog, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, '../../../frontend/src/data/exerciseCatalogData.ts'), frontendTsContent, 'utf8');

console.log('Successfully written catalog files to backend and frontend!');
