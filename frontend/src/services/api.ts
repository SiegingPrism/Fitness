const API_BASE = 'http://localhost:5001/api/v1';

export const fetchHealth = async () => {
  try {
    const res = await fetch('http://localhost:5001/health');
    return await res.json();
  } catch (err) {
    return { status: 'OFFLINE' };
  }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network connection error' };
  }
};

export const registerUser = async (userData: any) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network connection error' };
  }
};

export const fetchCoachAthletes = async () => {
  try {
    const res = await fetch(`${API_BASE}/coach/athletes`);
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
};

export const fetchExercises = async (filter?: { category?: string; search?: string }) => {
  try {
    let url = `${API_BASE}/exercises`;
    const params = new URLSearchParams();
    if (filter?.category && filter.category !== 'All') params.append('category', filter.category);
    if (filter?.search) params.append('search', filter.search);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return { success: false, data: [] };
  }
};

export const fetchExerciseById = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/exercises/${id}`);
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
  }
};

export const fetchExerciseAlternatives = async (id: string) => {
  try {
    const res = await fetch(`${API_BASE}/exercises/${id}/alternatives`);
    return await res.json();
  } catch (err) {
    return { success: false, data: null };
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

// Phase 5 Subscription & AI Quotas API
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
