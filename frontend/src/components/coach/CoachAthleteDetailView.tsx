import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export const CoachAthleteDetailView: React.FC<Props> = ({ onBack }) => {
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!note) return;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setNote('');
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '90px', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#c3c9b2', cursor: 'pointer' }}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Rahul Sharma</h1>
          <span style={{ fontSize: '12px', color: '#c3c9b2' }}>Hypertrophy Split • 12 Weeks</span>
        </div>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#151b2d', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
          <div style={{ fontSize: '10px', color: '#c3c9b2' }}>Compliance</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#bef264' }}>87%</div>
        </div>
        <div style={{ backgroundColor: '#151b2d', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
          <div style={{ fontSize: '10px', color: '#c3c9b2' }}>Streak</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>8 Days</div>
        </div>
        <div style={{ backgroundColor: '#151b2d', padding: '12px', borderRadius: '12px', border: '1px solid #2e3447' }}>
          <div style={{ fontSize: '10px', color: '#c3c9b2' }}>Bench PR</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>82.5 kg</div>
        </div>
      </div>

      {/* Send Note */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 className="font-headline" style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>Send Prescription Feedback</h3>
        <textarea
          placeholder="e.g. Increase bench weight next week. Target 85kg on Set 1."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: '100%', height: '80px', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none', resize: 'none' }}
        />
        {sent && <span style={{ fontSize: '12px', color: '#bef264' }}>✓ Note sent to athlete!</span>}
        <button onClick={handleSend} className="font-headline" style={{ padding: '10px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          Push Feedback
        </button>
      </div>
    </div>
  );
};
