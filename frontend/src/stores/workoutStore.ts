import { create } from 'zustand';

export interface SetLog {
  setNumber: number;
  weightLbs: number;
  reps: number;
  completed: boolean;
}

interface WorkoutState {
  isActiveSession: boolean;
  exerciseName: string;
  sessionSeconds: number;
  restSeconds: number;
  isResting: boolean;
  sets: SetLog[];
  completedSetsCount: number;
  
  startWorkout: (name?: string) => void;
  incrementSessionTime: () => void;
  startRestTimer: (durationSeconds?: number) => void;
  decrementRestTimer: () => void;
  addRestSeconds: (seconds: number) => void;
  skipRest: () => void;
  completeSet: (index: number) => void;
  updateSet: (index: number, weightLbs: number, reps: number) => void;
  finishWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>((set) => ({
  isActiveSession: false,
  exerciseName: 'Incline Bench Press Focus',
  sessionSeconds: 2535,
  restSeconds: 72,
  isResting: true,
  sets: [
    { setNumber: 1, weightLbs: 185, reps: 8, completed: true },
    { setNumber: 2, weightLbs: 195, reps: 6, completed: true },
    { setNumber: 3, weightLbs: 205, reps: 5, completed: false },
    { setNumber: 4, weightLbs: 205, reps: 4, completed: false }
  ],
  completedSetsCount: 2,

  startWorkout: (name = 'Leg Day Destruction') => set({
    isActiveSession: true,
    exerciseName: name,
    sessionSeconds: 0,
    restSeconds: 0,
    isResting: false,
    completedSetsCount: 0,
    sets: [
      { setNumber: 1, weightLbs: 185, reps: 8, completed: false },
      { setNumber: 2, weightLbs: 195, reps: 6, completed: false },
      { setNumber: 3, weightLbs: 205, reps: 5, completed: false },
      { setNumber: 4, weightLbs: 205, reps: 4, completed: false }
    ]
  }),

  incrementSessionTime: () => set((state) => ({ sessionSeconds: state.sessionSeconds + 1 })),

  startRestTimer: (durationSeconds = 90) => set({
    restSeconds: durationSeconds,
    isResting: true
  }),

  decrementRestTimer: () => set((state) => {
    if (state.restSeconds <= 1) {
      return { restSeconds: 0, isResting: false };
    }
    return { restSeconds: state.restSeconds - 1 };
  }),

  addRestSeconds: (seconds) => set((state) => ({
    restSeconds: state.restSeconds + seconds,
    isResting: true
  })),

  skipRest: () => set({ restSeconds: 0, isResting: false }),

  completeSet: (index) => set((state) => {
    const updatedSets = [...state.sets];
    updatedSets[index] = { ...updatedSets[index], completed: true };
    const count = updatedSets.filter((s) => s.completed).length;
    return {
      sets: updatedSets,
      completedSetsCount: count,
      restSeconds: 90,
      isResting: true
    };
  }),

  updateSet: (index, weightLbs, reps) => set((state) => {
    const updatedSets = [...state.sets];
    updatedSets[index] = { ...updatedSets[index], weightLbs, reps };
    return { sets: updatedSets };
  }),

  finishWorkout: () => set({
    isActiveSession: false,
    isResting: false,
    restSeconds: 0
  })
}));
