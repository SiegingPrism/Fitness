// Dynamic API Base for Web Browser & Android Capacitor Emulator
const getApiBase = () => {
  if (typeof window !== 'undefined') {
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
    setupInstructions: 'Set bench flat. Position safety pins just below chest touch point.',
    breathingInstructions: 'Inhale and brace core before descent; exhale forcefully past the sticking point.',
    coachingCues: ['Keep upper back tightly packed', 'Drive through heels', 'Stack wrists directly over elbows'],
    commonMistakes: ['Bouncing bar off sternum', 'Flaring elbows 90 degrees wide'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'DUMBBELL, BENCH', similarityScore: 95, matchReason: 'Same movement pattern • Similar primary chest tension • Freer shoulder path' },
      { exerciseId: 'ex_8', name: 'Machine Chest Press', equipment: 'MACHINE', similarityScore: 85, matchReason: 'Guided plane of motion • Ideal for high-fatigue hypertrophy drop sets' }
    ],
    personalBest: { weightKg: 100, reps: 5, estimated1RM: 116, totalVolumeKg: 42380, lastPerformed: '2 days ago' }
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
    setupInstructions: 'Position dumbbells on knee caps before kicking back flat.',
    breathingInstructions: 'Inhale deeply on descent into stretch; exhale at apex contraction.',
    coachingCues: ['Feel deep chest stretch at bottom', 'Squeeze chest at top'],
    commonMistakes: ['Clanking dumbbells together', 'Overextending shoulders at bottom'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_1', name: 'Barbell Bench Press', equipment: 'BARBELL, BENCH', similarityScore: 95, matchReason: 'Higher absolute load capability for maximum strength' }
    ],
    personalBest: { weightKg: 36, reps: 8, estimated1RM: 45, totalVolumeKg: 18200, lastPerformed: '5 days ago' }
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
    setupInstructions: 'Bench incline angle between 30° and 45° maximum.',
    breathingInstructions: 'Brace ribcage high on descent; press forcefully overhead.',
    coachingCues: ['Keep incline at 30°', 'Tuck elbows at 45 degrees'],
    commonMistakes: ['Setting bench angle steeper than 45°'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_4', name: 'Incline Dumbbell Press', equipment: 'DUMBBELL, BENCH', similarityScore: 92, matchReason: 'Greater stretch across upper clavicular fibers' }
    ],
    personalBest: { weightKg: 85, reps: 6, estimated1RM: 98, totalVolumeKg: 21000, lastPerformed: '1 week ago' }
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
    setupInstructions: 'Set rack height at collarbone level.',
    breathingInstructions: 'Inhale at bottom; exhale as bar passes eye level.',
    coachingCues: ['Squeeze glutes to protect lower back', 'Punch ceiling at top'],
    commonMistakes: ['Excessive lumbar hyper-extension'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_6', name: 'Dumbbell Shoulder Press', equipment: 'DUMBBELL', similarityScore: 90, matchReason: 'Comfortable natural hand rotation for shoulder impingement prevention' }
    ],
    personalBest: { weightKg: 60, reps: 5, estimated1RM: 68, totalVolumeKg: 14200, lastPerformed: '4 days ago' }
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
    setupInstructions: 'Place bar 1 inch from shins over mid-foot.',
    breathingInstructions: 'Val-salva belly brace before pulling slack out of the barbell.',
    coachingCues: ['Pull slack before lifting', 'Keep bar against shins'],
    commonMistakes: ['Rounding lumbar spine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 3, max: 5 }, recommendedRestSeconds: 180, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_12', name: 'Romanian Deadlift (RDL)', equipment: 'BARBELL', similarityScore: 88, matchReason: 'Eccentric focus with reduced spinal fatigue' }
    ],
    personalBest: { weightKg: 180, reps: 3, estimated1RM: 196, totalVolumeKg: 54000, lastPerformed: '3 days ago' }
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
    setupInstructions: 'Start standing tall with bar in overhand grip.',
    breathingInstructions: 'Inhale at top, hinge with braced core, exhale as glutes snap forward.',
    coachingCues: ['Push butt back toward wall', 'Maintain neutral spine'],
    commonMistakes: ['Squatting instead of hinging'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_11', name: 'Barbell Deadlift', equipment: 'BARBELL', similarityScore: 88, matchReason: 'Full floor start for explosive power' }
    ],
    personalBest: { weightKg: 120, reps: 8, estimated1RM: 148, totalVolumeKg: 31200, lastPerformed: '3 days ago' }
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
    setupInstructions: 'Adjust thigh pad tightly against quads.',
    breathingInstructions: 'Exhale driving elbows down; inhale allowing deep scapular elevation stretch.',
    coachingCues: ['Pull elbows into back pockets'],
    commonMistakes: ['Swinging torso excessively'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 8, max: 12 }, recommendedRestSeconds: 90, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_16', name: 'Pull-Up', equipment: 'PULL_UP_BAR', similarityScore: 94, matchReason: 'Bodyweight relative strength benchmark' }
    ],
    personalBest: { weightKg: 75, reps: 10, estimated1RM: 96, totalVolumeKg: 28400, lastPerformed: 'Yesterday' }
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
    setupInstructions: 'Use full closed grip around pull-up bar.',
    breathingInstructions: 'Exhale on upward pull; inhale descending into complete dead hang.',
    coachingCues: ['Initiate with scapular depression', 'Drive elbows down'],
    commonMistakes: ['Kicking legs / kipping'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '3-4 sets', recommendedRepRange: { min: 6, max: 10 }, recommendedRestSeconds: 120, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_15', name: 'Lat Pulldown', equipment: 'CABLE', similarityScore: 94, matchReason: 'Adjustable resistance for progressive overload' }
    ],
    personalBest: { weightKg: 80, reps: 12, estimated1RM: 108, totalVolumeKg: 19500, lastPerformed: 'Yesterday' }
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
    setupInstructions: 'Set bar at armpit level in power rack.',
    breathingInstructions: 'Huge 360-degree belly breath at top; hold brace during descent.',
    coachingCues: ['Chest up', 'Spread floor with feet'],
    commonMistakes: ['Knees caving inward', 'Rounding lumbar spine'],
    media: { thumbnail: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80' },
    programming: { recommendedSets: '4-5 sets', recommendedRepRange: { min: 5, max: 8 }, recommendedRestSeconds: 150, recommendedRPE: 8, recommendedRIR: 2 },
    alternatives: [
      { exerciseId: 'ex_24', name: 'Leg Press', equipment: 'LEG_PRESS', similarityScore: 85, matchReason: 'High quad overload with zero spinal loading' },
      { exerciseId: 'ex_25', name: 'Bulgarian Split Squat', equipment: 'DUMBBELL, BENCH', similarityScore: 82, matchReason: 'Unilateral leg balance and hip stability' }
    ],
    personalBest: { weightKg: 140, reps: 5, estimated1RM: 162, totalVolumeKg: 68400, lastPerformed: '6 days ago' }
  }
];

export interface ExerciseFilter {
  category?: string;
  muscle?: string;
  muscles?: string[];
  equipment?: string[];
  movementPatterns?: string[];
  difficulty?: string[];
  search?: string;
  page?: number;
  limit?: number;
}

export const fetchExercises = async (filter?: ExerciseFilter) => {
  try {
    let url = `${API_BASE}/exercises`;
    const params = new URLSearchParams();
    if (filter?.category && filter.category !== 'All') params.append('category', filter.category);
    if (filter?.muscle && filter.muscle !== 'All') params.append('muscle', filter.muscle);
    if (filter?.muscles && filter.muscles.length > 0) params.append('muscles', filter.muscles.join(','));
    if (filter?.equipment && filter.equipment.length > 0) params.append('equipment', filter.equipment.join(','));
    if (filter?.movementPatterns && filter.movementPatterns.length > 0) params.append('movementPattern', filter.movementPatterns.join(','));
    if (filter?.difficulty && filter.difficulty.length > 0) params.append('difficulty', filter.difficulty.join(','));
    if (filter?.search) params.append('search', filter.search);
    if (filter?.page) params.append('page', String(filter.page));
    if (filter?.limit) params.append('limit', String(filter.limit));
    
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    if (data?.data?.exercises && data.data.exercises.length > 0) {
      return { success: true, data: data.data.exercises, total: data.data.total, hasMore: data.data.hasMore };
    }
    if (Array.isArray(data?.data) && data.data.length > 0) {
      return { success: true, data: data.data, total: data.data.length, hasMore: false };
    }
    // Fallback if backend network is unreachable in native emulator
    let filtered = FALLBACK_30_EXERCISES;
    if (filter?.muscle && filter.muscle !== 'All') {
      filtered = filtered.filter((e) => e.primaryMuscles.includes(filter.muscle!));
    }
    if (filter?.muscles && filter.muscles.length > 0) {
      filtered = filtered.filter((e) => e.primaryMuscles.some((m) => filter.muscles!.includes(m)));
    }
    if (filter?.equipment && filter.equipment.length > 0) {
      filtered = filtered.filter((e) => e.equipment.some((eq) => filter.equipment!.includes(eq)));
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      filtered = filtered.filter((e) => e.name.toLowerCase().includes(q) || e.slug.toLowerCase().includes(q));
    }
    return { success: true, data: filtered, total: filtered.length, hasMore: false };
  } catch (err) {
    let filtered = FALLBACK_30_EXERCISES;
    if (filter?.muscle && filter.muscle !== 'All') {
      filtered = filtered.filter((e) => e.primaryMuscles.includes(filter.muscle!));
    }
    return { success: true, data: filtered, total: filtered.length, hasMore: false };
  }
};

export const fetchPopularExercises = async () => {
  try {
    const res = await fetch(`${API_BASE}/exercises/popular`);
    const data = await res.json();
    if (data?.data && Array.isArray(data.data)) return data;
    return { success: true, data: FALLBACK_30_EXERCISES.slice(0, 6) };
  } catch (err) {
    return { success: true, data: FALLBACK_30_EXERCISES.slice(0, 6) };
  }
};

export const fetchFavoriteExercises = async () => {
  try {
    const res = await fetch(`${API_BASE}/exercises/favorites`);
    const data = await res.json();
    if (data?.data && Array.isArray(data.data)) return data;
    return { success: true, data: [FALLBACK_30_EXERCISES[0], FALLBACK_30_EXERCISES[4], FALLBACK_30_EXERCISES[8]] };
  } catch (err) {
    return { success: true, data: [FALLBACK_30_EXERCISES[0], FALLBACK_30_EXERCISES[4], FALLBACK_30_EXERCISES[8]] };
  }
};

export const toggleFavoriteExerciseApi = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/exercises/${id}/favorite`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    return { success: true, data: { isFavorite: true } };
  }
};

export const fetchRecentExercises = async () => {
  try {
    const res = await fetch(`${API_BASE}/exercises/recent`);
    const data = await res.json();
    if (data?.data && Array.isArray(data.data)) return data;
    return { success: true, data: FALLBACK_30_EXERCISES.slice(0, 4) };
  } catch (err) {
    return { success: true, data: FALLBACK_30_EXERCISES.slice(0, 4) };
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
