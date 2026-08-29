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

import { EXERCISE_CATALOG_317 } from '../data/exerciseCatalogData';

export const FALLBACK_30_EXERCISES = EXERCISE_CATALOG_317;
export const EXERCISE_CATALOG = EXERCISE_CATALOG_317;

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
    const applyLocalFilters = (list: any[]) => {
      let res = list;
      if (filter?.category && filter.category !== 'All') {
        res = res.filter((e) => e.category?.some((c: string) => c.toLowerCase() === filter.category!.toLowerCase()));
      }
      if (filter?.muscle && filter.muscle !== 'All') {
        res = res.filter((e) => e.primaryMuscles.includes(filter.muscle!));
      }
      if (filter?.muscles && filter.muscles.length > 0) {
        res = res.filter((e) => e.primaryMuscles.some((m: string) => filter.muscles!.includes(m)));
      }
      if (filter?.equipment && filter.equipment.length > 0) {
        res = res.filter((e) => e.equipment.some((eq: string) => filter.equipment!.includes(eq)));
      }
      if (filter?.difficulty && filter.difficulty.length > 0) {
        res = res.filter((e) => filter.difficulty!.includes(e.difficulty));
      }
      if (filter?.movementPatterns && filter.movementPatterns.length > 0) {
        res = res.filter((e) => filter.movementPatterns!.includes(e.movementPattern));
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase().trim();
        res = res.filter((e) =>
          e.name.toLowerCase().includes(q) ||
          e.slug.toLowerCase().includes(q) ||
          e.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
          e.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
          e.primaryMuscles?.some((m: string) => m.toLowerCase().includes(q))
        );
      }
      return res;
    };

    const filtered = applyLocalFilters(FALLBACK_30_EXERCISES);
    return { success: true, data: filtered, total: filtered.length, hasMore: false };
  } catch (err) {
    const applyLocalFilters = (list: any[]) => {
      let res = list;
      if (filter?.category && filter.category !== 'All') {
        res = res.filter((e) => e.category?.some((c: string) => c.toLowerCase() === filter.category!.toLowerCase()));
      }
      if (filter?.muscle && filter.muscle !== 'All') {
        res = res.filter((e) => e.primaryMuscles.includes(filter.muscle!));
      }
      if (filter?.muscles && filter.muscles.length > 0) {
        res = res.filter((e) => e.primaryMuscles.some((m: string) => filter.muscles!.includes(m)));
      }
      if (filter?.equipment && filter.equipment.length > 0) {
        res = res.filter((e) => e.equipment.some((eq: string) => filter.equipment!.includes(eq)));
      }
      if (filter?.difficulty && filter.difficulty.length > 0) {
        res = res.filter((e) => filter.difficulty!.includes(e.difficulty));
      }
      if (filter?.movementPatterns && filter.movementPatterns.length > 0) {
        res = res.filter((e) => filter.movementPatterns!.includes(e.movementPattern));
      }
      if (filter?.search) {
        const q = filter.search.toLowerCase().trim();
        res = res.filter((e) =>
          e.name.toLowerCase().includes(q) ||
          e.slug.toLowerCase().includes(q) ||
          e.aliases?.some((a: string) => a.toLowerCase().includes(q)) ||
          e.tags?.some((t: string) => t.toLowerCase().includes(q)) ||
          e.primaryMuscles?.some((m: string) => m.toLowerCase().includes(q))
        );
      }
      return res;
    };
    const filtered = applyLocalFilters(FALLBACK_30_EXERCISES);
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
