import React from 'react';

interface Props {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const AthleteNavBar: React.FC<Props> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'dashboard',
      label: 'Home',
      icon: (isActive: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={isActive ? 'none' : 'none'} stroke="currentColor" strokeWidth={isActive ? '2.4' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      id: 'workout_library',
      label: 'Workouts',
      icon: (isActive: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.4' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"></path>
        </svg>
      )
    },
    {
      id: 'progress',
      label: 'Insights',
      icon: (isActive: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.4' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="6" strokeWidth={isActive ? '2.8' : '2'} strokeLinecap="round"></line>
          <line x1="12" y1="20" x2="12" y2="10" strokeWidth={isActive ? '2.8' : '2'} strokeLinecap="round"></line>
          <line x1="6" y1="20" x2="6" y2="15" strokeWidth={isActive ? '2.8' : '2'} strokeLinecap="round"></line>
        </svg>
      )
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (isActive: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={isActive ? '2.4' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0c1322',
      borderTop: '1px solid #1a2338',
      padding: '8px 16px 14px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 999,
      backdropFilter: 'blur(16px)'
    }}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        const color = isActive ? '#2dd4bf' : '#64748b';
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
              padding: '4px 12px',
              minWidth: '60px',
              transition: 'all 0.15s ease'
            }}
          >
            {tab.icon(isActive)}
            <span style={{ fontSize: '11px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.2px' }}>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
