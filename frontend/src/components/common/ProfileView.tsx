import React from 'react';

interface Props {
  role: 'ATHLETE' | 'COACH';
  onSwitchRole: () => void;
  onLogout: () => void;
  onNavigateSubscription?: () => void;
}

export const ProfileView: React.FC<Props> = ({ role, onSwitchRole, onLogout, onNavigateSubscription }) => {
  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header with Settings Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Profile</h1>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>settings</span>
        </button>
      </div>

      {/* 2. Hero Avatar Profile Card */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
        <div style={{ position: 'relative', width: '108px', height: '108px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid #bef264',
            boxShadow: '0 0 20px rgba(190, 242, 100, 0.4)'
          }}></div>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Alex Rivera"
            style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover' }}
          />
          {/* ELITE Pill Badge */}
          <span style={{
            position: 'absolute',
            bottom: '-2px',
            right: '-2px',
            backgroundColor: '#bef264',
            color: '#0c1324',
            fontSize: '10px',
            fontWeight: '900',
            padding: '3px 9px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
            letterSpacing: '0.5px'
          }}>
            ELITE
          </span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Alex Rivera</h2>
          <span style={{ fontSize: '13px', color: '#bef264', fontWeight: '600' }}>Titan Level 42 • {role === 'ATHLETE' ? 'Athlete' : 'Head Coach'}</span>
        </div>
      </div>

      {/* 3. Three-Column Key Stats Grid */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderRight: '1px solid #23293c' }}>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>128</div>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>WORKOUTS</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', borderRight: '1px solid #23293c' }}>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>🔥 15</div>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>DAY STREAK</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>45k</div>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>KG LIFTED</div>
        </div>
      </div>

      {/* 4. Phase 5 Pro Subscription Banner */}
      <div
        onClick={onNavigateSubscription}
        style={{
          backgroundColor: '#151b2d',
          border: '1px solid #bef264',
          borderRadius: '18px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(190, 242, 100, 0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#bef264', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '24px', fontWeight: 'bold' }}>workspace_premium</span>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>Titan Athlete PRO</div>
            <div style={{ fontSize: '11px', color: '#bef264' }}>Active • Manage Subscription</div>
          </div>
        </div>
        <span className="material-symbols-outlined" style={{ color: '#bef264' }}>chevron_right</span>
      </div>

      {/* 5. Account Settings & Connected Devices List */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '6px 14px', display: 'flex', flexDirection: 'column' }}>
        {[
          { label: 'Connected Devices', icon: 'devices', sub: 'Apple Watch & Heart Rate Strap' },
          { label: 'Biometrics & 1RM Targets', icon: 'monitor_weight', sub: 'Body weight: 76.5 kg' },
          { label: 'Notifications & Alerts', icon: 'notifications_active', sub: 'Workout reminders enabled' }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: idx < 2 ? '1px solid #23293c' : 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="material-symbols-outlined" style={{ color: '#8d9882', fontSize: '22px' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#8d9882', marginTop: '2px' }}>{item.sub}</div>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#8d9882', fontSize: '18px' }}>chevron_right</span>
          </div>
        ))}
      </div>

      {/* 6. Switch Role & Logout Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={onSwitchRole}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#191f31',
            border: '1px solid #3cddc7',
            color: '#3cddc7',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>sync_alt</span>
          <span>Switch to {role === 'ATHLETE' ? 'Coach' : 'Athlete'} Mode</span>
        </button>

        <button
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#191f31',
            border: '1px solid #ff5c5c',
            color: '#ff5c5c',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
