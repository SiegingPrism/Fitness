import React from 'react';

interface Props {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const CoachNavBar: React.FC<Props> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    { id: 'coach_dashboard', label: 'Dashboard', icon: 'space_dashboard' },
    { id: 'coach_athlete_detail', label: 'Athletes', icon: 'groups' },
    { id: 'coach_program_builder', label: 'Programs', icon: 'build' },
    { id: 'messaging', label: 'Messages', icon: 'chat' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#070d1f',
      borderTop: '1px solid #2e3447',
      padding: '8px 16px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 50
    }}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const color = isActive ? '#bef264' : '#c3c9b2';
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              color,
              cursor: 'pointer',
              fontWeight: isActive ? '600' : '400'
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{tab.icon}</span>
            <span style={{ fontSize: '10px' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
