import React from 'react';

interface Props {
  onSelectScreen: (screenId: string) => void;
}

export const NavigationHub: React.FC<Props> = ({ onSelectScreen }) => {
  const athleteScreens = [
    { id: 'dashboard', name: 'Athlete Dashboard (Home)' },
    { id: 'active_workout', name: 'Active Workout Tracker' },
    { id: 'workout_summary', name: 'Workout Completed Summary' },
    { id: 'progress', name: 'Progress & 1RM Analytics' },
    { id: 'workout_library', name: 'Exercise & Workout Library' },
    { id: 'ai_trainer', name: 'AI Adaptive Trainer' },
    { id: 'log_meal', name: 'Log Meal (Food & Macros)' },
    { id: 'water_tracker', name: 'Water Tracker (Hydration)' },
    { id: 'join_challenge', name: 'Join Challenge & Communities' },
    { id: 'subscription', name: 'Subscriptions & Monetization (Phase 5)' }
  ];

  const coachScreens = [
    { id: 'coach_dashboard', name: 'Coach Dashboard (Roster)' },
    { id: 'coach_athlete_detail', name: 'Coach Athlete Detail' },
    { id: 'coach_program_builder', name: 'Program Builder' }
  ];

  const commonScreens = [
    { id: 'login', name: 'Login Screen' },
    { id: 'onboarding', name: 'Onboarding Questionnaire' },
    { id: 'messaging', name: 'Coach-Athlete Messages' },
    { id: 'profile', name: 'Profile & Account Settings' },
    { id: 'subscription', name: 'Subscription Plans & Paywall' }
  ];

  return (
    <div style={{ padding: '20px', maxWidth: '440px', margin: '0 auto', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h1 className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff' }}>Kinetic Obsidian Hub</h1>
        <p style={{ fontSize: '13px', color: '#8d9882' }}>Select any screen to navigate directly</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Athlete Section */}
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#bef264', textTransform: 'uppercase', marginBottom: '10px' }}>Athlete Views</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {athleteScreens.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#151b2d',
                  border: '1px solid #2e3447',
                  borderRadius: '12px',
                  color: '#ffffff',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{s.name}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#8d9882' }}>arrow_forward</span>
              </button>
            ))}
          </div>
        </div>

        {/* Coach Section */}
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#3cddc7', textTransform: 'uppercase', marginBottom: '10px' }}>Coach Views</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {coachScreens.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#151b2d',
                  border: '1px solid #2e3447',
                  borderRadius: '12px',
                  color: '#ffffff',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{s.name}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#8d9882' }}>arrow_forward</span>
              </button>
            ))}
          </div>
        </div>

        {/* Common Section */}
        <div>
          <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffb4ab', textTransform: 'uppercase', marginBottom: '10px' }}>Shared Views</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {commonScreens.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#151b2d',
                  border: '1px solid #2e3447',
                  borderRadius: '12px',
                  color: '#ffffff',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{s.name}</span>
                <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#8d9882' }}>arrow_forward</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
