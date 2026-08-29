import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export const CoachProgramBuilderView: React.FC<Props> = ({ onBack }) => {
  const [title, setTitle] = useState('12-Week Advanced Hypertrophy');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onBack();
    }, 1500);
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '90px', maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#c3c9b2', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>Program Builder</h1>
        </div>
        <button onClick={handleSave} className="font-headline" style={{ padding: '8px 16px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          {saved ? 'SAVED ✓' : 'SAVE'}
        </button>
      </header>

      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '16px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', color: '#c3c9b2', marginBottom: '4px' }}>Program Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '14px', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#c3c9b2', marginBottom: '4px' }}>Duration (Weeks)</label>
            <input type="number" value="12" readOnly style={{ width: '100%', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#c3c9b2', marginBottom: '4px' }}>Target Goal</label>
            <select style={{ width: '100%', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff' }}>
              <option>Hypertrophy</option>
              <option>Strength</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
