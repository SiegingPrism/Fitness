import React from 'react';

interface Props {
  onSelectAthlete: () => void;
  onNavigateProgramBuilder: () => void;
  onNavigateMessaging: () => void;
}

export const CoachDashboardView: React.FC<Props> = ({ onSelectAthlete, onNavigateProgramBuilder, onNavigateMessaging }) => {
  return (
    <div style={{ padding: '16px', paddingBottom: '90px', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', fontWeight: 'bold', color: '#bef264', letterSpacing: '1px' }}>COACH PORTAL</span>
          <h1 className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff' }}>COMMAND CENTER</h1>
        </div>
        <button onClick={onNavigateProgramBuilder} className="font-headline" style={{ padding: '8px 14px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          + New Program
        </button>
      </div>

      {/* Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        <div style={{ backgroundColor: '#151b2d', padding: '12px', borderRadius: '14px', border: '1px solid #2e3447' }}>
          <div style={{ fontSize: '10px', color: '#c3c9b2', textTransform: 'uppercase' }}>Athletes</div>
          <div className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '2px' }}>42</div>
        </div>
        <div style={{ backgroundColor: '#151b2d', padding: '12px', borderRadius: '14px', border: '1px solid #2e3447' }}>
          <div style={{ fontSize: '10px', color: '#c3c9b2', textTransform: 'uppercase' }}>Programs</div>
          <div className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '2px' }}>37</div>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 181, 71, 0.08)', padding: '12px', borderRadius: '14px', border: '1px solid rgba(255, 181, 71, 0.3)' }}>
          <div style={{ fontSize: '10px', color: '#ffb547', textTransform: 'uppercase' }}>Attention</div>
          <div className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffb547', marginTop: '2px' }}>6</div>
        </div>
      </div>

      {/* Priority Queue */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '13px', fontWeight: 'bold', textTransform: 'uppercase', color: '#ffffff' }}>Priority Athlete Queue</h2>
          <button onClick={onNavigateMessaging} style={{ background: 'none', border: 'none', color: '#bef264', fontSize: '12px', cursor: 'pointer' }}>View Messages →</button>
        </div>

        <div onClick={onSelectAthlete} style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '14px', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Rahul Sharma</div>
            <div style={{ fontSize: '12px', color: '#c3c9b2' }}>Push/Pull/Legs • Week 4</div>
          </div>
          <span style={{ padding: '4px 10px', backgroundColor: 'rgba(255, 92, 92, 0.15)', color: '#ff5c5c', border: '1px solid rgba(255, 92, 92, 0.3)', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
            3 Missed Sessions
          </span>
        </div>

        <div onClick={onSelectAthlete} style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '14px', borderRadius: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '15px' }}>Sarah Jenkins</div>
            <div style={{ fontSize: '12px', color: '#c3c9b2' }}>Hypertrophy Block • Week 6</div>
          </div>
          <span style={{ padding: '4px 10px', backgroundColor: 'rgba(190, 242, 100, 0.15)', color: '#bef264', border: '1px solid rgba(190, 242, 100, 0.3)', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold' }}>
            Ready for Progression (+5kg)
          </span>
        </div>
      </div>
    </div>
  );
};
