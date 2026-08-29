import React, { useState, useEffect } from 'react';
import { fetchAnalyticsProgress } from '../../services/api';

interface Props {
  role: 'ATHLETE' | 'COACH';
  onSwitchRole: () => void;
  onLogout: () => void;
  onNavigateSubscription?: () => void;
}

export const ProfileView: React.FC<Props> = ({ role, onSwitchRole, onLogout, onNavigateSubscription }) => {
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    const loadProfileData = async () => {
      const res = await fetchAnalyticsProgress();
      if (isMounted && res?.data) {
        setProfileData(res.data);
      }
    };
    loadProfileData();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalWorkouts = profileData?.totalWorkouts || 18;
  const activeStreak = profileData?.activeStreakDays || 15;
  const totalVolumeKg = profileData?.monthlyVolumeKg || 42850;
  const bodyMetrics = profileData?.bodyMetrics || {
    weightKg: 76.5,
    bodyFatPct: 13.8,
    muscleMassKg: 64.2,
    restingHeartRateBpm: 58
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header with Settings Icon */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.6px' }}>
            ATHLETE ACCOUNT
          </div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', marginTop: '2px' }}>
            Profile & Settings
          </h1>
        </div>

        <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#131d2e', border: '1px solid #24324a', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>

      {/* 2. Hero Avatar Profile Card matching Home aesthetic */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', position: 'relative' }}>
        <div style={{ position: 'relative', width: '92px', height: '92px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt="Alex Rivera"
            style={{ width: '84px', height: '84px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #22d3ee', boxShadow: '0 0 16px rgba(34, 211, 238, 0.45)' }}
          />
          {/* Online green indicator */}
          <span style={{ position: 'absolute', bottom: '4px', right: '4px', width: '13px', height: '13px', backgroundColor: '#34d399', borderRadius: '50%', border: '2.5px solid #0c1324' }}></span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>
              Alex Rivera
            </h2>
            <span style={{ backgroundColor: '#0284c7', color: '#ffffff', fontSize: '10px', fontWeight: '900', padding: '2px 7px', borderRadius: '6px', letterSpacing: '0.4px' }}>
              PRO
            </span>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', marginTop: '4px', display: 'block' }}>
            Titan Level 42 • {role === 'ATHLETE' ? 'Athlete' : 'Head Coach'}
          </span>
        </div>

        {/* 3. Key Stats Row */}
        <div style={{ width: '100%', backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '16px', padding: '12px 6px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', textAlign: 'center', marginTop: '4px' }}>
          <div style={{ borderRight: '1px solid #1e2d44', padding: '0 4px' }}>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>{totalWorkouts}</div>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '2px' }}>WORKOUTS</div>
          </div>
          <div style={{ borderRight: '1px solid #1e2d44', padding: '0 4px' }}>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#00f2fe' }}>{activeStreak}</div>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '2px' }}>DAY STREAK</div>
          </div>
          <div style={{ padding: '0 4px' }}>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#bef264' }}>{(totalVolumeKg / 1000).toFixed(1)}k</div>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: '2px' }}>KG LIFTED</div>
          </div>
        </div>
      </div>

      {/* 4. Body Biometrics Card */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>Biometrics</h3>
          <span style={{ fontSize: '11px', color: '#22d3ee', fontWeight: '800' }}>Synced</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>WEIGHT</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>{bodyMetrics.weightKg} kg</div>
          </div>
          <div style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>BODY FAT</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#06b6d4', marginTop: '2px' }}>{bodyMetrics.bodyFatPct}%</div>
          </div>
          <div style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>MUSCLE MASS</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#bef264', marginTop: '2px' }}>{bodyMetrics.muscleMassKg} kg</div>
          </div>
          <div style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px' }}>
            <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>RESTING HR</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#34d399', marginTop: '2px' }}>{bodyMetrics.restingHeartRateBpm} bpm</div>
          </div>
        </div>
      </div>

      {/* 5. Pro Membership Banner */}
      <div
        onClick={onNavigateSubscription}
        style={{
          backgroundColor: '#111b2b',
          border: '1.5px solid #06b6d4',
          borderRadius: '20px',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 16px rgba(6, 182, 212, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#06b6d4', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>Titan Athlete PRO</div>
            <div style={{ fontSize: '11px', color: '#22d3ee', fontWeight: '600', marginTop: '2px' }}>Active • Manage Subscription</div>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>

      {/* 6. Settings & Preference Items */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '20px', padding: '6px 16px', display: 'flex', flexDirection: 'column' }}>
        {[
          {
            label: 'Connected Devices',
            sub: 'Apple Watch & Heart Rate Strap',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
            )
          },
          {
            label: 'Biometrics & 1RM Targets',
            sub: 'Body weight: 76.5 kg',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                <line x1="16" y1="8" x2="2" y2="22"></line>
                <line x1="17.5" y1="15" x2="9" y2="15"></line>
              </svg>
            )
          },
          {
            label: 'Notifications & Reminders',
            sub: 'Daily workout alerts enabled',
            icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            )
          }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: idx < 2 ? '1px solid #162236' : 'none', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#0b121f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{item.sub}</div>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        ))}
      </div>

      {/* 7. Switch Role & Logout Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          type="button"
          onClick={onSwitchRole}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#111b2b',
            border: '1px solid #06b6d4',
            color: '#06b6d4',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(6, 182, 212, 0.15)'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
          <span>Switch to {role === 'ATHLETE' ? 'Coach' : 'Athlete'} Mode</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#111b2b',
            border: '1px solid #ef4444',
            color: '#ef4444',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};
