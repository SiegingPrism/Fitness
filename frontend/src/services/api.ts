// Dynamic API Base for Web Browser & Android Capacitor Emulator
const getApiBase = () => {
  if (typeof window !== 'undefined') {
    // When running inside native Android WebView (Capacitor), host is accessible at 10.0.2.2
    if (window.location.protocol === 'https:' && window.location.hostname === 'localhost') {
      return 'http://10.0.2.2:5001/api/v1';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5001/api/v1';
    }
    return 'http://10.0.2.2:5001/api/v1';
  }
  return 'http://localhost:5001/api/v1';
};

const API_BASE = getApiBase();

export const FALLBACK_30_EXERCISES = [
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
    instructions: [
      'Lie on the bench with eyes directly under the racked bar.',
      'Grip the bar slightly wider than shoulder width with thumbs wrapped around.',
      'Unrack the bar and position it directly over mid-chest with locked elbows.',
      'Inhale deeply and lower bar under control until it lightly touches lower chest.',
      'Drive feet into floor and press bar back up in a slight backward arc to lockout.'
    ],
    coachingCues: ['Keep upper back tightly packed', 'Drive through heels', 'Stack wrists directly over elbows'],
    commonMistakes: ['Bouncing bar off sternum', 'Flaring elbows 90 degrees wide'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'DUMBBELL, BENCH', similarityScore: 95 }],
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
    instructions: ['Sit on bench edge with dumbbells on thighs; kick back.', 'Press dumbbells upwards in converging arc.', 'Lower with control for deep stretch.'],
    coachingCues: ['Feel deep chest stretch at bottom', 'Squeeze chest at top'],
    commonMistakes: ['Clanking dumbbells together', 'Overextending shoulders at bottom'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_1', name: 'Barbell Bench Press', equipment: 'BARBELL, BENCH', similarityScore: 95 }],
    personalBest: { weightKg: 36, reps: 8, estimated1RM: 45, totalVolumeKg: 18200, achievedAt: new Date() }
  },
  {
    _id: 'ex_3',
    name: 'Incline Barbell Bench Press',
    slug: 'incline-barbell-bench-press',
    description: 'Upper chest pressing movement emphasizing the clavicular head.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HORIZONTAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['CHEST'],
    secondaryMuscles: ['FRONT_DELTS', 'TRICEPS'],
    equipment: ['BARBELL', 'BENCH'],
    instructions: ['Set bench to 30 degrees.', 'Lower bar to upper chest.', 'Press vertically back to lockout.'],
    coachingCues: ['Keep incline at 30°', 'Tuck elbows at 45 degrees'],
    commonMistakes: ['Setting bench angle steeper than 45°'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_4', name: 'Incline Dumbbell Press', equipment: 'DUMBBELL, BENCH', similarityScore: 92 }],
    personalBest: { weightKg: 85, reps: 6, estimated1RM: 98, totalVolumeKg: 21000, achievedAt: new Date() }
  },
  {
    _id: 'ex_5',
    name: 'Overhead Press (OHP)',
    slug: 'overhead-press',
    description: 'Standing compound vertical push building anterior delts and core stability.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'VERTICAL_PUSH',
    difficulty: 'INTERMEDIATE',
    primaryMuscles: ['FRONT_DELTS'],
    secondaryMuscles: ['TRICEPS', 'UPPER_BACK'],
    equipment: ['BARBELL'],
    instructions: ['Grip bar just outside shoulders.', 'Squeeze glutes and press bar overhead.', 'Push head through window at lockout.'],
    coachingCues: ['Squeeze glutes to protect lower back', 'Punch ceiling at top'],
    commonMistakes: ['Excessive lumbar hyper-extension'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_6', name: 'Dumbbell Shoulder Press', equipment: 'DUMBBELL', similarityScore: 90 }]
  },
  {
    _id: 'ex_11',
    name: 'Barbell Deadlift',
    slug: 'barbell-deadlift',
    description: 'The king of posterior chain compound movements building back and hamstring density.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'HINGE',
    difficulty: 'ADVANCED',
    primaryMuscles: ['LOWER_BACK', 'GLUTES', 'HAMSTRINGS'],
    secondaryMuscles: ['LATS', 'UPPER_BACK'],
    equipment: ['BARBELL'],
    instructions: ['Stand with midfoot under bar.', 'Hinge hips, engage lats, push floor away.', 'Lock out hips without hyperextending.'],
    coachingCues: ['Pull slack before lifting', 'Keep bar against shins'],
    commonMistakes: ['Rounding lumbar spine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 3, max: 5 }, recommendedRestSeconds: 180, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_12', name: 'Romanian Deadlift (RDL)', equipment: 'BARBELL', similarityScore: 88 }],
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
    secondaryMuscles: ['LOWER_BACK'],
    equipment: ['BARBELL'],
    instructions: ['Unlock knees.', 'Hinge hips back as far as possible.', 'Drive hips forward to return.'],
    coachingCues: ['Push butt back toward wall', 'Maintain neutral spine'],
    commonMistakes: ['Squatting instead of hinging'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_11', name: 'Barbell Deadlift', equipment: 'BARBELL', similarityScore: 88 }]
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
    secondaryMuscles: ['BICEPS'],
    equipment: ['BARBELL'],
    instructions: ['Hinge torso to 45 degrees.', 'Pull bar into lower ribs.', 'Lower bar under control.'],
    coachingCues: ['Pull with elbows', 'Squeeze shoulder blades at top'],
    commonMistakes: ['Standing too upright'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_14', name: 'Single-Arm Dumbbell Row', equipment: 'DUMBBELL', similarityScore: 92 }]
  },
  {
    _id: 'ex_15',
    name: 'Lat Pulldown',
    slug: 'lat-pulldown',
    description: 'Vertical cable pulling movement building lat width.',
    category: ['HYPERTROPHY'],
    movementPattern: 'VERTICAL_PULL',
    difficulty: 'BEGINNER',
    primaryMuscles: ['LATS'],
    secondaryMuscles: ['BICEPS'],
    equipment: ['CABLE'],
    instructions: ['Pull bar down to upper chest.', 'Drive elbows down and back.', 'Return to full stretch.'],
    coachingCues: ['Pull elbows into back pockets'],
    commonMistakes: ['Swinging torso excessively'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_16', name: 'Pull-Up', equipment: 'PULL_UP_BAR', similarityScore: 94 }]
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
    secondaryMuscles: ['BICEPS', 'UPPER_BACK'],
    equipment: ['PULL_UP_BAR'],
    instructions: ['Overhand grip slightly wider than shoulders.', 'Pull chin over bar.', 'Lower to dead-hang.'],
    coachingCues: ['Initiate with scapular depression', 'Drive elbows down'],
    commonMistakes: ['Kicking legs / kipping'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_15', name: 'Lat Pulldown', equipment: 'CABLE', similarityScore: 94 }]
  },
  {
    _id: 'ex_21',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    description: 'The premier lower body compound exercise targeting quads and glutes.',
    category: ['STRENGTH', 'HYPERTROPHY'],
    movementPattern: 'SQUAT',
    difficulty: 'ADVANCED',
    primaryMuscles: ['QUADS', 'GLUTES'],
    secondaryMuscles: ['HAMSTRINGS', 'LOWER_BACK'],
    equipment: ['BARBELL'],
    instructions: ['Position bar across upper traps.', 'Descend until hip crease is below knee.', 'Drive forcefully through midfoot.'],
    coachingCues: ['Chest up', 'Spread floor with feet'],
    commonMistakes: ['Knees caving inward', 'Rounding lumbar spine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4-5 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 150, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_24', name: 'Leg Press', equipment: 'LEG_PRESS', similarityScore: 85 }],
    personalBest: { weightKg: 140, reps: 5, estimated1RM: 162, totalVolumeKg: 68400, achievedAt: new Date() }
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
    instructions: ['Position feet shoulder-width on sled.', 'Lower sled to 90 degrees.', 'Press sled away without locking knees.'],
    coachingCues: ['Do not lock knees aggressively', 'Keep back against pad'],
    commonMistakes: ['Pelvis lifting off seat'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 10, max: 15 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 85 }]
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
    instructions: ['Elevate rear foot on bench.', 'Lower into front leg until thigh is parallel.', 'Drive through front heel.'],
    coachingCues: ['85% weight on front leg'],
    commonMistakes: ['Pushing off rear foot'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 9, recommendedRIR: 1 },
    alternatives: [{ exerciseId: 'ex_21', name: 'Barbell Back Squat', equipment: 'BARBELL', similarityScore: 82 }]
  }
];

export interface ExerciseFilter {
  category?: string;
  muscle?: string;
  equipment?: string;
  movementPattern?: string;
  difficulty?: string;
  search?: string;
}

export const fetchExercises = async (filter?: ExerciseFilter) => {
  try {
    let url = `${API_BASE}/exercises`;
    const params = new URLSearchParams();
    if (filter?.category && filter.category !== 'All') params.append('category', filter.category);
    if (filter?.muscle && filter.muscle !== 'All') params.append('muscle', filter.muscle);
    if (filter?.equipment && filter.equipment !== 'All') params.append('equipment', filter.equipment);
    if (filter?.movementPattern && filter.movementPattern !== 'All') params.append('movementPattern', filter.movementPattern);
    if (filter?.difficulty && filter.difficulty !== 'All') params.append('difficulty', filter.difficulty);
    if (filter?.search) params.append('search', filter.search);
    
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data?.data?.exercises && data.data.exercises.length > 0) {
      return { success: true, data: data.data.exercises, total: data.data.total };
    }
    if (Array.isArray(data?.data) && data.data.length > 0) {
      return { success: true, data: data.data, total: data.data.length };
    }
    // Fallback if backend network is unreachable in native emulator
    let filtered = FALLBACK_30_EXERCISES;
    if (filter?.muscle && filter.muscle !== 'All') {
      filtered = filtered.filter((e) => e.primaryMuscles.includes(filter.muscle!));
    }
    return { success: true, data: filtered, total: filtered.length };
  } catch (err) {
    let filtered = FALLBACK_30_EXERCISES;
    if (filter?.muscle && filter.muscle !== 'All') {
      filtered = filtered.filter((e) => e.primaryMuscles.includes(filter.muscle!));
    }
    return { success: true, data: filtered, total: filtered.length };
  }
};

export const fetchExerciseById = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/exercises/${id}`);
    const data = await res.json();
    if (data?.data) return data;
    const found = FALLBACK_30_EXERCISES.find((e) => e._id === id || e.slug === id) || FALLBACK_30_EXERCISES[0];
    return { success: true, data: found };
  } catch (err) {
    const found = FALLBACK_30_EXERCISES.find((e) => e._id === id || e.slug === id) || FALLBACK_30_EXERCISES[0];
    return { success: true, data: found };
  }
};

export const fetchExerciseAlternatives = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/exercises/${id}/alternatives`);
    const data = await res.json();
    if (data?.data) return data;
    const found = FALLBACK_30_EXERCISES.find((e) => e._id === id || e.slug === id) || FALLBACK_30_EXERCISES[0];
    return { success: true, data: { originalExerciseId: found._id, alternatives: found.alternatives || [] } };
  } catch (err) {
    const found = FALLBACK_30_EXERCISES.find((e) => e._id === id || e.slug === id) || FALLBACK_30_EXERCISES[0];
    return { success: true, data: { originalExerciseId: found._id, alternatives: found.alternatives || [] } };
  }
};

export const fetchWorkoutHistory = async () => {
  try {
    const res = await fetch(`${API_BASE}/workouts/sessions`);
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const logWorkout = async (workoutData: any) => {
  try {
    const res = await fetch(`${API_BASE}/workouts/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData)
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const fetchAnalyticsProgress = async () => {
  try {
    const res = await fetch(`${API_BASE}/analytics/progress`);
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
};

export const fetchMessages = async () => {
  try {
    const res = await fetch(`${API_BASE}/messages`);
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const sendMessageApi = async (text: string) => {
  try {
    const res = await fetch(`${API_BASE}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const fetchPlans = async () => {
  try {
    const res = await fetch(`${API_BASE}/subscriptions/plans`);
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const fetchCurrentSubscription = async () => {
  try {
    const res = await fetch(`${API_BASE}/subscriptions/current`);
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
};

export const checkoutPlan = async (tier: string, billingInterval: 'monthly' | 'yearly') => {
  try {
    const res = await fetch(`${API_BASE}/subscriptions/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier, billingInterval })
    });
    return await res.json();
  } catch (err) {
    return { success: false };
  }
};

export const fetchAIUsage = async () => {
  try {
    const res = await fetch(`${API_BASE}/ai/usage`);
    return await res.json();
  } catch (err) {
    return {
      success: true,
      data: {
        promptsUsedToday: 4,
        dailyQuota: 50,
        promptsRemainingToday: 46
      }
    };
  }
};
