import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore.js';
import { useAppStore } from '../stores/appStore.js';

// Screens
import { LoginView } from '../components/auth/LoginView.js';
import { OnboardingView } from '../components/auth/OnboardingView.js';
import { AthleteDashboardView } from '../components/athlete/AthleteDashboardView.js';
import { ActiveWorkoutView } from '../components/athlete/ActiveWorkoutView.js';
import { WorkoutSummaryView } from '../components/athlete/WorkoutSummaryView.js';
import { ProgressAnalyticsView } from '../components/athlete/ProgressAnalyticsView.js';
import { WorkoutLibraryView } from '../components/athlete/WorkoutLibraryView.js';
import { ExerciseDetailView } from '../components/athlete/ExerciseDetailView.js';
import { AITrainerView } from '../components/athlete/AITrainerView.js';
import { LogMealView } from '../components/athlete/LogMealView.js';
import { WaterTrackerView } from '../components/athlete/WaterTrackerView.js';
import { JoinChallengeView } from '../components/athlete/JoinChallengeView.js';
import { SubscriptionView } from '../components/common/SubscriptionView.js';
import { CoachDashboardView } from '../components/coach/CoachDashboardView.js';
import { CoachAthleteDetailView } from '../components/coach/CoachAthleteDetailView.js';
import { CoachProgramBuilderView } from '../components/coach/CoachProgramBuilderView.js';
import { MessagingView } from '../components/common/MessagingView.js';
import { ProfileView } from '../components/common/ProfileView.js';
import { NavigationHub } from '../components/NavigationHub.js';

// Layout
import { AthleteNavBar } from '../components/layout/AthleteNavBar.js';
import { CoachNavBar } from '../components/layout/CoachNavBar.js';

export const RootNavigator: React.FC = () => {
  const { user, isAuthenticated, setRole, logout } = useAuthStore();
  const { currentScreen, setCurrentScreen, toasts, dismissToast } = useAppStore();
  const [selectedExerciseId, setSelectedExerciseId] = useState('ex_1');
  const [activeWorkoutExercise, setActiveWorkoutExercise] = useState<any>(null);

  const role = user?.role || 'ATHLETE';

  // Scroll to top whenever screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleLoginSuccess = (selectedRole: 'ATHLETE' | 'COACH') => {
    setRole(selectedRole);
    setCurrentScreen(selectedRole === 'COACH' ? 'coach_dashboard' : 'dashboard');
  };

  const isTabbedScreen = ['dashboard', 'active_workout', 'progress', 'workout_library', 'exercise_detail', 'ai_trainer', 'coach_dashboard', 'coach_athlete_detail', 'coach_program_builder', 'messaging', 'profile', 'log_meal', 'water_tracker', 'join_challenge', 'subscription'].includes(currentScreen);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b121f', color: '#cbd5e1', position: 'relative' }}>
      
      {/* Toast Alert Banner Overlay */}
      {toasts.length > 0 && (
        <div style={{ position: 'fixed', top: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {toasts.map((toast) => (
            <div
              key={toast.id}
              onClick={() => dismissToast(toast.id)}
              style={{
                backgroundColor: '#151b2d',
                border: `1px solid ${toast.type === 'error' ? '#ff5c5c' : '#bef264'}`,
                color: toast.type === 'error' ? '#ff5c5c' : '#bef264',
                padding: '10px 18px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 'bold',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}



      {/* Unauthenticated Stack */}
      {!isAuthenticated && currentScreen !== 'hub' && (
        currentScreen === 'onboarding' ? (
          <OnboardingView onComplete={() => handleLoginSuccess('ATHLETE')} onBackToLogin={() => setCurrentScreen('login')} />
        ) : (
          <LoginView onLoginSuccess={handleLoginSuccess} onNavigateOnboarding={() => setCurrentScreen('onboarding')} />
        )
      )}

      {/* Authenticated Screens */}
      {currentScreen === 'hub' && <NavigationHub onSelectScreen={(screenId) => setCurrentScreen(screenId)} />}
      {currentScreen === 'login' && <LoginView onLoginSuccess={handleLoginSuccess} onNavigateOnboarding={() => setCurrentScreen('onboarding')} />}
      {currentScreen === 'onboarding' && <OnboardingView onComplete={() => handleLoginSuccess('ATHLETE')} onBackToLogin={() => setCurrentScreen('login')} />}

      {/* Athlete Screen Stack */}
      {currentScreen === 'dashboard' && (
        <AthleteDashboardView
          onStartWorkout={() => {
            setActiveWorkoutExercise(null);
            setCurrentScreen('active_workout');
          }}
          onNavigateLogMeal={() => setCurrentScreen('log_meal')}
          onNavigateJoinChallenge={() => setCurrentScreen('join_challenge')}
          onNavigateWaterTracker={() => setCurrentScreen('water_tracker')}
        />
      )}
      {currentScreen === 'log_meal' && (
        <LogMealView onBack={() => setCurrentScreen('dashboard')} onConfirmLog={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'water_tracker' && (
        <WaterTrackerView onBack={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'join_challenge' && (
        <JoinChallengeView onBack={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'subscription' && (
        <SubscriptionView onBack={() => setCurrentScreen('profile')} />
      )}

      {currentScreen === 'active_workout' && (
        <ActiveWorkoutView
          initialExercise={activeWorkoutExercise}
          onCompleteWorkout={() => setCurrentScreen('workout_summary')}
          onCancel={() => {
            setActiveWorkoutExercise(null);
            setCurrentScreen('dashboard');
          }}
        />
      )}
      {currentScreen === 'workout_summary' && (
        <WorkoutSummaryView onReturnDashboard={() => setCurrentScreen('dashboard')} />
      )}
      {currentScreen === 'progress' && <ProgressAnalyticsView />}
      {currentScreen === 'workout_library' && (
        <WorkoutLibraryView
          onSelectExercise={(id) => {
            setSelectedExerciseId(id);
            setCurrentScreen('exercise_detail');
          }}
          onStartExerciseWorkout={(exercise) => {
            setActiveWorkoutExercise(exercise);
            setCurrentScreen('active_workout');
          }}
        />
      )}
      {currentScreen === 'exercise_detail' && (
        <ExerciseDetailView
          exerciseId={selectedExerciseId}
          onBack={() => setCurrentScreen('workout_library')}
          onSelectAlternative={(altId) => setSelectedExerciseId(altId)}
          onStartWorkoutWithExercise={(exercise) => {
            setActiveWorkoutExercise(exercise);
            setCurrentScreen('active_workout');
          }}
        />
      )}
      {currentScreen === 'ai_trainer' && <AITrainerView />}

      {/* Coach Screen Stack */}
      {currentScreen === 'coach_dashboard' && (
        <CoachDashboardView
          onSelectAthlete={() => setCurrentScreen('coach_athlete_detail')}
          onNavigateProgramBuilder={() => setCurrentScreen('coach_program_builder')}
          onNavigateMessaging={() => setCurrentScreen('messaging')}
        />
      )}
      {currentScreen === 'coach_athlete_detail' && (
        <CoachAthleteDetailView onBack={() => setCurrentScreen('coach_dashboard')} />
      )}
      {currentScreen === 'coach_program_builder' && (
        <CoachProgramBuilderView onBack={() => setCurrentScreen('coach_dashboard')} />
      )}

      {/* Common Screens */}
      {currentScreen === 'messaging' && <MessagingView />}
      {currentScreen === 'profile' && (
        <ProfileView
          role={role === 'COACH' ? 'COACH' : 'ATHLETE'}
          onNavigateSubscription={() => setCurrentScreen('subscription')}
          onSwitchRole={() => {
            const nextRole = role === 'ATHLETE' ? 'COACH' : 'ATHLETE';
            setRole(nextRole);
            setCurrentScreen(nextRole === 'COACH' ? 'coach_dashboard' : 'dashboard');
          }}
          onLogout={() => {
            logout();
            setCurrentScreen('login');
          }}
        />
      )}

      {/* Role-Based Bottom Navigation Bar */}
      {isTabbedScreen && currentScreen !== 'active_workout' && currentScreen !== 'workout_summary' && (
        role === 'COACH' ? (
          <CoachNavBar currentTab={currentScreen} onSelectTab={(tab) => setCurrentScreen(tab)} />
        ) : (
          <AthleteNavBar currentTab={currentScreen} onSelectTab={(tab) => setCurrentScreen(tab)} />
        )
      )}
    </div>
  );
};
