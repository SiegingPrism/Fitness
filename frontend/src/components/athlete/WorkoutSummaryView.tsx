import React from 'react';

interface Props {
  onReturnDashboard: () => void;
}

export const WorkoutSummaryView: React.FC<Props> = ({ onReturnDashboard }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#0c1324' }}>
      <div style={{ width: '100%', maxWidth: '440px', backgroundColor: '#151b2d', padding: '32px 24px', borderRadius: '20px', border: '1px solid #2e3447', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(190, 242, 100, 0.1)', border: '2px solid #bef264', color: '#bef264', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '40px' }}>workspace_premium</span>
        </div>

        <div>
          <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#bef264', textTransform: 'uppercase', letterSpacing: '1px' }}>WORKOUT COMPLETE</span>
          <h1 className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>PUSH DAY CRUSHED!</h1>
          <p style={{ fontSize: '12px', color: '#c3c9b2', marginTop: '4px' }}>Great consistency today, Alex.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <div style={{ backgroundColor: '#191f31', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
            <div style={{ fontSize: '10px', color: '#c3c9b2', textTransform: 'uppercase' }}>Volume</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#bef264', marginTop: '2px' }}>8,420 kg</div>
          </div>
          <div style={{ backgroundColor: '#191f31', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
            <div style={{ fontSize: '10px', color: '#c3c9b2', textTransform: 'uppercase' }}>Duration</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginTop: '2px' }}>52 min</div>
          </div>
          <div style={{ backgroundColor: '#191f31', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
            <div style={{ fontSize: '10px', color: '#c3c9b2', textTransform: 'uppercase' }}>Exercises</div>
            <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', marginTop: '2px' }}>6 / 6</div>
          </div>
        </div>

        <div style={{ backgroundColor: 'rgba(190, 242, 100, 0.08)', border: '1px solid rgba(190, 242, 100, 0.2)', padding: '16px', borderRadius: '14px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '28px' }}>emoji_events</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>NEW PERSONAL RECORD!</div>
            <div style={{ fontSize: '12px', color: '#c3c9b2' }}>Barbell Bench Press — 82.5 kg × 8 reps</div>
          </div>
        </div>

        <button
          onClick={onReturnDashboard}
          className="font-headline"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#bef264',
            color: '#0c1324',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>RETURN TO DASHBOARD</span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
