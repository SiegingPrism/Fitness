import React, { useState } from 'react';

interface Props {
  onStartWorkout: () => void;
  onNavigateLogMeal?: () => void;
  onNavigateJoinChallenge?: () => void;
  onNavigateWaterTracker?: () => void;
}

export const AthleteDashboardView: React.FC<Props> = ({
  onStartWorkout,
  onNavigateLogMeal,
  onNavigateJoinChallenge,
  onNavigateWaterTracker
}) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '22px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex"
              style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #22d3ee', boxShadow: '0 0 12px rgba(34, 211, 238, 0.4)' }}
            />
            <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '11px', height: '11px', backgroundColor: '#34d399', borderRadius: '50%', border: '2px solid #0c1324' }}></span>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.6px' }}>READY TO TRAIN?</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '1px' }}>
              <span className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px' }}>Welcome, Alex</span>
              <span style={{ backgroundColor: '#0284c7', color: '#ffffff', fontSize: '10px', fontWeight: '900', padding: '2px 7px', borderRadius: '6px', letterSpacing: '0.4px' }}>
                PRO
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#131d2e', border: '1px solid #24324a', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button onClick={() => setShowNotificationModal(!showNotificationModal)} style={{ position: 'relative', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#131d2e', border: '1px solid #24324a', color: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span style={{ position: 'absolute', top: '9px', right: '9px', width: '7px', height: '7px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></span>
          </button>
        </div>
      </div>

      {/* Notifications Dropdown Modal */}
      {showNotificationModal && (
        <div style={{ backgroundColor: '#131d2e', border: '1px solid #24324a', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}>
            <span>NOTIFICATIONS</span>
            <span style={{ color: '#22d3ee', cursor: 'pointer' }} onClick={() => setShowNotificationModal(false)}>Close</span>
          </div>
          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>Coach Dan Miller assigned your <strong>Push/Pull/Legs</strong> routine.</div>
          <div style={{ fontSize: '12px', color: '#cbd5e1' }}>You reached a <strong>15-Day Streak</strong> achievement!</div>
        </div>
      )}

      {/* 2. Daily Pulse Card */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-headline" style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>Daily Pulse</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px' }}>85% OF GOAL</span>
            <div style={{ width: '65px', height: '2.5px', backgroundColor: '#06b6d4', borderRadius: '2px' }}></div>
          </div>
        </div>

        {/* 3 Ring Gauges with Cyan Glowing Aesthetic */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', textAlign: 'center' }}>
          {/* Ring 1: Calories -> Log Meal */}
          <div onClick={onNavigateLogMeal} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="84" height="84" viewBox="0 0 84 84" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="42" cy="42" r="34" stroke="#162236" strokeWidth="8" fill="none" />
                <circle cx="42" cy="42" r="34" stroke="#06b6d4" strokeWidth="8" strokeDasharray="213" strokeDashoffset="45" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.6))' }} />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>1,200</div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>KCAL</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>Calories</span>
          </div>

          {/* Ring 2: Active -> Start Workout */}
          <div onClick={onStartWorkout} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="84" height="84" viewBox="0 0 84 84" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="42" cy="42" r="34" stroke="#162236" strokeWidth="8" fill="none" />
                <circle cx="42" cy="42" r="34" stroke="#00f2fe" strokeWidth="8" strokeDasharray="213" strokeDashoffset="55" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(0, 242, 254, 0.6))' }} />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>42</div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>MINS</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>Minutes Active</span>
          </div>

          {/* Ring 3: Hydration -> Water Tracker */}
          <div onClick={onNavigateWaterTracker} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '84px', height: '84px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="84" height="84" viewBox="0 0 84 84" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="42" cy="42" r="34" stroke="#162236" strokeWidth="8" fill="none" />
                <circle cx="42" cy="42" r="34" stroke="#22d3ee" strokeWidth="8" strokeDasharray="213" strokeDashoffset="75" strokeLinecap="round" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.6))' }} />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>1.75L</div>
                <div style={{ fontSize: '9px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' }}>WATER</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>Hydration</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>Quick Actions</h3>
        <div className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {/* Action 1: Log Meal */}
          <button
            onClick={onNavigateLogMeal}
            style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '16px', minWidth: '110px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'center' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"></path>
                <path d="M15 11v11"></path>
                <path d="M6 2v20"></path>
                <path d="M9 2v4a3 3 0 0 1-3 3"></path>
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Log Meal</span>
          </button>

          {/* Action 2: Join Challenge (Highlighted with Cyan Glow) */}
          <button
            onClick={onNavigateJoinChallenge}
            style={{ backgroundColor: '#111b2b', border: '1.5px solid #06b6d4', borderRadius: '18px', padding: '16px', minWidth: '120px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'center', boxShadow: '0 0 14px rgba(6, 182, 212, 0.2)' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#06b6d4', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-2.34"></path>
                <path d="M14 14.66V17c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-2.34"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Join Challenge</span>
          </button>

          {/* Action 3: Log Water */}
          <button
            onClick={onNavigateWaterTracker}
            style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '16px', minWidth: '110px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'center' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#162236', color: '#22d3ee', border: '1px solid #24324a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Log Water</span>
          </button>

          {/* Action 4: New Workout */}
          <button
            onClick={onStartWorkout}
            style={{ backgroundColor: '#111b2b', border: '1px solid #bef264', borderRadius: '18px', padding: '16px', minWidth: '120px', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', textAlign: 'center' }}
          >
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#162236', color: '#bef264', border: '1px solid #bef264', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"></path>
              </svg>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>New Workout</span>
          </button>
        </div>
      </div>

      {/* 4. Next Workout Hero Card */}
      <div style={{
        position: 'relative',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid #1e2d44',
        minHeight: '200px',
        backgroundImage: 'linear-gradient(to top, rgba(11, 18, 31, 0.96) 20%, rgba(11, 18, 31, 0.4)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px', letterSpacing: '0.6px' }}>
            NEXT WORKOUT
          </span>
        </div>

        <div>
          <h2 className="font-headline" style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: '8px 0 4px' }}>Leg Day Destruction</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', fontSize: '13px', color: '#cbd5e1' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              45 mins
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
              520 kcal
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#bef264' }}>Starts in 15 mins</span>
            <button
              onClick={onStartWorkout}
              className="font-headline"
              style={{
                backgroundColor: '#bef264',
                color: '#0c1324',
                border: 'none',
                padding: '10px 24px',
                borderRadius: '24px',
                fontSize: '13px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(190, 242, 100, 0.4)'
              }}
            >
              <span>START</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
