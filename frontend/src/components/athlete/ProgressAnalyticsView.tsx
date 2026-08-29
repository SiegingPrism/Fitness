import React, { useState } from 'react';

export const ProgressAnalyticsView: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState('Bench Press');

  const prs = [
    { exercise: 'Bench Press', topSet: '100 kg × 5 reps', est1RM: '116 kg', date: 'Yesterday' },
    { exercise: 'Back Squat', topSet: '140 kg × 5 reps', est1RM: '162 kg', date: '3 days ago' },
    { exercise: 'Deadlift', topSet: '180 kg × 3 reps', est1RM: '196 kg', date: 'Last week' },
    { exercise: 'Overhead Press', topSet: '65 kg × 6 reps', est1RM: '78 kg', date: 'Aug 22' }
  ];

  const muscleVolumes = [
    { muscle: 'Chest', sets: 18, target: 20, pct: '90%' },
    { muscle: 'Back', sets: 22, target: 20, pct: '100%' },
    { muscle: 'Quads', sets: 16, target: 18, pct: '88%' },
    { muscle: 'Hamstrings', sets: 12, target: 14, pct: '85%' },
    { muscle: 'Shoulders', sets: 14, target: 16, pct: '87%' },
    { muscle: 'Arms', sets: 10, target: 12, pct: '83%' }
  ];

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Performance Analytics</h1>
          <span style={{ fontSize: '12px', color: '#8d9882' }}>Volume, PRs & 1RM Progression</span>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
        </button>
      </div>

      {/* 2. Estimated 1RM Progression Curve Card */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#8d9882', letterSpacing: '0.5px' }}>STRENGTH PROGRESSION</div>
            <div className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', marginTop: '2px' }}>
              82.5 kg <span style={{ fontSize: '13px', color: '#bef264', fontWeight: '600' }}>+10.5%</span>
            </div>
          </div>
          <span style={{ backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#3cddc7', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '12px' }}>
            5 WEEKS
          </span>
        </div>

        {/* Exercise Chips Selector */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
          {['Bench Press', 'Squat', 'Deadlift'].map((ex) => (
            <button
              key={ex}
              onClick={() => setSelectedExercise(ex)}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                backgroundColor: selectedExercise === ex ? '#bef264' : '#191f31',
                color: selectedExercise === ex ? '#0c1324' : '#8d9882',
                fontWeight: 'bold',
                fontSize: '12px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Smooth SVG Curve Graph */}
        <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '4px' }}>
          <svg width="100%" height="100%" viewBox="0 0 340 140" fill="none">
            <defs>
              <linearGradient id="gradientCurve" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#bef264" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#bef264" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path d="M 10 110 C 60 100, 110 85, 170 70 C 230 55, 280 40, 330 25 L 330 140 L 10 140 Z" fill="url(#gradientCurve)" />
            {/* Curve Stroke */}
            <path d="M 10 110 C 60 100, 110 85, 170 70 C 230 55, 280 40, 330 25" stroke="#bef264" strokeWidth="3" strokeLinecap="round" />
            {/* Key Data Point Dots */}
            <circle cx="10" cy="110" r="4" fill="#0c1324" stroke="#bef264" strokeWidth="2" />
            <circle cx="90" cy="92" r="4" fill="#0c1324" stroke="#bef264" strokeWidth="2" />
            <circle cx="170" cy="70" r="4" fill="#0c1324" stroke="#bef264" strokeWidth="2" />
            <circle cx="250" cy="48" r="4" fill="#0c1324" stroke="#bef264" strokeWidth="2" />
            <circle cx="330" cy="25" r="5" fill="#bef264" stroke="#0c1324" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* 3. Dedicated Personal Records (PRs) Shelf (Phase 6A.26) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Personal Records (PRs)</h2>
          <span style={{ fontSize: '11px', color: '#bef264', fontWeight: 'bold' }}>All-Time Best</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {prs.map((pr, idx) => (
            <div key={idx} style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '18px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '11px', color: '#8d9882', fontWeight: 'bold' }}>{pr.exercise}</div>
              <div className="font-headline" style={{ fontSize: '18px', fontWeight: '900', color: '#bef264' }}>{pr.est1RM}</div>
              <div style={{ fontSize: '11px', color: '#dce1fb' }}>{pr.topSet}</div>
              <div style={{ fontSize: '9px', color: '#8d9882', marginTop: '2px' }}>{pr.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Muscle Group Weekly Training Volume (Phase 6A.24) */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Muscle Group Volume</h3>
            <div style={{ fontSize: '11px', color: '#8d9882' }}>Weekly Sets vs Target</div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3cddc7' }}>92 Sets Total</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {muscleVolumes.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#ffffff', fontWeight: '600' }}>{item.muscle}</span>
                <span style={{ color: '#8d9882' }}>{item.sets} / {item.target} sets</span>
              </div>
              <div style={{ height: '6px', backgroundColor: '#23293c', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: item.pct, height: '100%', backgroundColor: '#bef264', borderRadius: '3px' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
