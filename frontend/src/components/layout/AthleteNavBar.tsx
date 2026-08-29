import React from 'react';

interface Props {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AthleteNavBar: React.FC<Props> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'workout_library', label: 'Workouts', icon: '🏋️' },
    { id: 'progress', label: 'Insights', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#111a12',
      borderTop: '1px solid #23321d',
      padding: '10px 16px 16px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 999
    }}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const color = isActive ? '#bef264' : '#8d9882';
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color,
              cursor: 'pointer',
              fontWeight: isActive ? '700' : '500',
              padding: '6px 16px',
              minWidth: '64px'
            }}
          >
            <span style={{ fontSize: '18px' }}>{tab.icon}</span>
            <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
