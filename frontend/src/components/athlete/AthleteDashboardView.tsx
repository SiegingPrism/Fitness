import React, { useState } from 'react';

interface Props {
  onStartWorkout: () => void;
  onNavigateAI?: () => void;
  onNavigateLogMeal?: () => void;
  onNavigateJoinChallenge?: () => void;
  onNavigateWaterTracker?: () => void;
}

export const AthleteDashboardView: React.FC<Props> = ({
  onStartWorkout,
  onNavigateAI,
  onNavigateLogMeal,
  onNavigateJoinChallenge,
  onNavigateWaterTracker
}) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex"
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #bef264' }}
            />
            <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', backgroundColor: '#35d07f', borderRadius: '50%', border: '2px solid #0c1324' }}></span>
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#8d9882', letterSpacing: '0.5px' }}>READY TO TRAIN?</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Welcome, Alex</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>search</span>
          </button>
          <button onClick={() => setShowNotificationModal(!showNotificationModal)} style={{ position: 'relative', width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
            <span style={{ position: 'absolute', top: '8px', right: '8px', width: '7px', height: '7px', backgroundColor: '#ff5c5c', borderRadius: '50%' }}></span>
          </button>
        </div>
      </div>

      {/* Notifications Dropdown Modal */}
      {showNotificationModal && (
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}>
            <span>NOTIFICATIONS</span>
            <span style={{ color: '#bef264', cursor: 'pointer' }} onClick={() => setShowNotificationModal(false)}>Close</span>
          </div>
          <div style={{ fontSize: '12px', color: '#c3c9b2' }}>🏋️ Coach Dan Miller assigned your <strong>Push/Pull/Legs</strong> routine.</div>
          <div style={{ fontSize: '12px', color: '#c3c9b2' }}>🔥 You reached a <strong>15-Day Streak</strong> achievement!</div>
        </div>
      )}

      {/* 2. Daily Pulse Card */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Daily Pulse</span>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase', letterSpacing: '0.5px' }}>85% OF GOAL</span>
        </div>

        {/* 3 Ring Gauges */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
          {/* Ring 1: Calories -> Log Meal */}
          <div onClick={onNavigateLogMeal} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" stroke="#191f31" strokeWidth="8" fill="none" />
                <circle cx="40" cy="40" r="32" stroke="#bef264" strokeWidth="8" strokeDasharray="201" strokeDashoffset="35" strokeLinecap="round" fill="none" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>1.2k</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>KCAL</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>Calories ↗</span>
          </div>

          {/* Ring 2: Active -> Start Workout */}
          <div onClick={onStartWorkout} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" stroke="#191f31" strokeWidth="8" fill="none" />
                <circle cx="40" cy="40" r="32" stroke="#3cddc7" strokeWidth="8" strokeDasharray="201" strokeDashoffset="45" strokeLinecap="round" fill="none" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>42</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>MINS</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>Active ↗</span>
          </div>

          {/* Ring 3: Water / Heart -> Water Tracker */}
          <div onClick={onNavigateWaterTracker} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="40" cy="40" r="32" stroke="#191f31" strokeWidth="8" fill="none" />
                <circle cx="40" cy="40" r="32" stroke="#3cddc7" strokeWidth="8" strokeDasharray="201" strokeDashoffset="65" strokeLinecap="round" fill="none" />
              </svg>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>1.75L</div>
                <div style={{ fontSize: '9px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase' }}>WATER</div>
              </div>
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>Hydration ↗</span>
          </div>
        </div>
      </div>

      {/* 3. Quick Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff' }}>Quick Actions</h3>
        <div className="no-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {/* Action 1: Log Meal */}
          <button
            onClick={onNavigateLogMeal}
            style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px', minWidth: '130px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#bef264', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>restaurant</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>Log Meal</span>
          </button>

          {/* Action 2: Join Challenge */}
          <button
            onClick={onNavigateJoinChallenge}
            style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px', minWidth: '140px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#3cddc7', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>emoji_events</span>
            </div>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>Join Challenge</span>
          </button>

          {/* Action 3: Water Tracker */}
          <button
            onClick={onNavigateWaterTracker}
            style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px', minWidth: '130px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#23293c', color: '#3cddc7', border: '1px solid #2e3447', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>water_drop</span>
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', display: 'block' }}>Water Tracker</span>
              <span style={{ fontSize: '10px', color: '#3cddc7', fontWeight: 'bold' }}>1.75L</span>
            </div>
          </button>

          {/* Action 4: AI Coach */}
          <button
            onClick={onNavigateAI}
            style={{ backgroundColor: '#151b2d', border: '1px solid #bef264', borderRadius: '16px', padding: '16px', minWidth: '130px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer', textAlign: 'left' }}
          >
            <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#bef264', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>smart_toy</span>
            </div>
            <div>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', display: 'block' }}>AI Trainer</span>
              <span style={{ fontSize: '10px', color: '#bef264', fontWeight: 'bold' }}>PRO Online</span>
            </div>
          </button>
        </div>
      </div>

      {/* 4. Next Workout Hero Card */}
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #2e3447',
        minHeight: '190px',
        backgroundImage: 'linear-gradient(to top, rgba(12, 19, 36, 0.95), rgba(12, 19, 36, 0.3)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px', letterSpacing: '0.5px' }}>
            NEXT WORKOUT
          </span>
        </div>

        <div>
          <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Leg Day Destruction</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px', fontSize: '13px', color: '#dce1fb' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#8d9882' }}>schedule</span> 45 mins
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#8d9882' }}>local_fire_department</span> 520 kcal
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#bef264' }}>Starts in 15 mins</span>
            <button
              onClick={onStartWorkout}
              className="font-headline"
              style={{
                backgroundColor: '#bef264',
                color: '#0c1324',
                border: 'none',
                padding: '10px 22px',
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
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>play_arrow</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Weekly Activity Chart Card */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Weekly Activity</h3>
            <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px' }}>Consistency is key</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#3cddc7' }}>5/7</div>
            <div style={{ fontSize: '10px', color: '#8d9882', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.5px' }}>DAYS ACTIVE</div>
          </div>
        </div>

        {/* Vertical Bar Chart Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '95px', paddingTop: '10px' }}>
          {[
            { day: 'M', height: '30%', active: false },
            { day: 'T', height: '90%', active: true, color: '#3cddc7' },
            { day: 'W', height: '25%', active: false },
            { day: 'T', height: '85%', active: true, color: '#bef264' },
            { day: 'F', height: '75%', active: true, color: '#bef264' },
            { day: 'S', height: '60%', active: true, color: '#bef264' },
            { day: 'S', height: '35%', active: false }
          ].map((bar, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <div style={{
                width: '18px',
                height: bar.height,
                backgroundColor: bar.active ? bar.color : '#23293c',
                borderRadius: '6px'
              }}></div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#8d9882' }}>{bar.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
