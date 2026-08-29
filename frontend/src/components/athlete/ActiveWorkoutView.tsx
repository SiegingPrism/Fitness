import React, { useState, useEffect } from 'react';
import { logWorkout } from '../../services/api.js';

interface Props {
  onCompleteWorkout: () => void;
  onCancel: () => void;
  initialExercise?: any;
}

export const ActiveWorkoutView: React.FC<Props> = ({ onCompleteWorkout, onCancel, initialExercise }) => {
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [restSeconds, setRestSeconds] = useState(initialExercise?.programming?.recommendedRestSeconds || 90);
  const [isResting, setIsResting] = useState(false);
  const [exerciseName, setExerciseName] = useState(
    initialExercise?.name || (typeof initialExercise === 'string' ? initialExercise : 'Barbell Bench Press')
  );
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [sets, setSets] = useState([
    { id: 1, type: 'Warm-up', weight: 40, reps: 12, rir: 3, rpe: 6, completed: false },
    { id: 2, type: 'Working Set', weight: 60, reps: 10, rir: 2, rpe: 8, completed: false },
    { id: 3, type: 'Working Set', weight: 70, reps: 8, rir: 1, rpe: 8.5, completed: false },
    { id: 4, type: 'Working Set', weight: 80, reps: 6, rir: 0, rpe: 9, completed: false }
  ]);

  const alternatives = initialExercise?.alternatives && initialExercise.alternatives.length > 0
    ? initialExercise.alternatives
    : [
        { name: 'Dumbbell Incline Press', equipment: 'Dumbbells', similarity: '95%' },
        { name: 'Smith Machine Incline Press', equipment: 'Smith Machine', similarity: '90%' },
        { name: 'Plate-Loaded Chest Press', equipment: 'Machine', similarity: '85%' }
      ];

  // Stopwatch timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rest countdown timer
  useEffect(() => {
    let restTimer: any;
    if (isResting && restSeconds > 0) {
      restTimer = setInterval(() => {
        setRestSeconds((prev: number) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(restTimer);
  }, [isResting, restSeconds]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCompleteSet = (index: number) => {
    const newSets = [...sets];
    newSets[index].completed = true;
    setSets(newSets);

    setRestSeconds(90);
    setIsResting(true);
    setToastMessage(`✓ Set ${index + 1} Logged! (Volume: ${newSets[index].weight * newSets[index].reps} kg)`);
    setTimeout(() => setToastMessage(null), 2500);

    const allCompleted = newSets.every((s) => s.completed);
    if (allCompleted) {
      const calculatedVolume = newSets.reduce((sum, s) => sum + (s.weight * s.reps), 0);
      logWorkout({
        exerciseName,
        sets: newSets,
        durationMinutes: Math.round(sessionSeconds / 60) || 1,
        totalVolumeKg: calculatedVolume
      });
      onCompleteWorkout();
    }
  };

  const updateWeight = (index: number, delta: number) => {
    const newSets = [...sets];
    newSets[index].weight = Math.max(0, Math.round((newSets[index].weight + delta) * 10) / 10);
    setSets(newSets);
  };

  const updateReps = (index: number, delta: number) => {
    const newSets = [...sets];
    newSets[index].reps = Math.max(1, newSets[index].reps + delta);
    setSets(newSets);
  };

  const currentSetIndex = sets.findIndex((s) => !s.completed);
  const activeSetIdx = currentSetIndex === -1 ? sets.length - 1 : currentSetIndex;

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Toast Alert */}
      {toastMessage && (
        <div style={{ backgroundColor: '#111b2b', border: '1px solid #bef264', color: '#bef264', padding: '10px 16px', borderRadius: '14px', fontSize: '13px', fontWeight: '800', textAlign: 'center', boxShadow: '0 4px 16px rgba(190, 242, 100, 0.25)' }}>
          {toastMessage}
        </div>
      )}

      {/* 1. Header Bar matching Obsidian & Cyan aesthetic */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111b2b', border: '1px solid #1e2d44', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            WORKOUT IN PROGRESS
          </div>
          <div className="font-headline" style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', letterSpacing: '0.5px' }}>
            {formatTime(sessionSeconds)}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowSwapModal(true)}
          style={{
            backgroundColor: '#111b2b',
            border: '1px solid #06b6d4',
            color: '#06b6d4',
            padding: '7px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(6, 182, 212, 0.25)'
          }}
        >
          Swap Move
        </button>
      </div>

      {/* Swap Exercise Modal */}
      {showSwapModal && (
        <div style={{ backgroundColor: '#111b2b', border: '1.5px solid #06b6d4', borderRadius: '22px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-headline" style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff' }}>Smart Exercise Swap</span>
            <span onClick={() => setShowSwapModal(false)} style={{ color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '800' }}>✕ Close</span>
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Choose a compatible movement pattern replacement:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alternatives.map((alt: any, idx: number) => (
              <div
                key={idx}
                onClick={() => {
                  setExerciseName(alt.name);
                  setShowSwapModal(false);
                  setToastMessage(`Swapped to ${alt.name}!`);
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff' }}>{alt.name}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{alt.equipment} • <span style={{ color: '#bef264', fontWeight: '700' }}>{alt.similarity}</span></div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="17 1 21 5 17 9"></polyline>
                  <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                  <polyline points="7 23 3 19 7 15"></polyline>
                  <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                </svg>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Hero Exercise Header Card */}
      <div style={{
        position: 'relative',
        borderRadius: '22px',
        overflow: 'hidden',
        border: '1px solid #1e2d44',
        minHeight: '140px',
        backgroundImage: 'linear-gradient(to top, rgba(11, 18, 31, 0.95), rgba(11, 18, 31, 0.3)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '6px', letterSpacing: '0.4px' }}>
            CHEST • HORIZONTAL PUSH
          </span>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#22d3ee' }}>
            Set {activeSetIdx + 1} of {sets.length}
          </span>
        </div>

        <div>
          <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>{exerciseName}</h2>
          <div style={{ fontSize: '12px', color: '#cbd5e1', marginTop: '4px' }}>
            Target: <strong style={{ color: '#bef264' }}>3-4 sets × 6-8 reps @ RIR 2</strong>
          </div>
        </div>
      </div>

      {/* 3. Progressive Overload Advice Banner */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#bef264" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
        <div style={{ fontSize: '12px', color: '#cbd5e1' }}>
          <strong style={{ color: '#ffffff' }}>Progression Goal:</strong> Hit 8 reps on set 3 to unlock +2.5 kg next session.
        </div>
      </div>

      {/* 4. Circular Rest Timer Gauge */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="50" stroke="#0b121f" strokeWidth="8" fill="none" />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#06b6d4"
              strokeWidth="8"
              strokeDasharray="314"
              strokeDashoffset={314 - (314 * (restSeconds / 90))}
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.6))', transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff' }}>{formatTime(restSeconds)}</div>
            <div style={{ fontSize: '9px', fontWeight: '800', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.6px' }}>RESTING</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="button"
            onClick={() => setRestSeconds((prev: number) => prev + 15)}
            style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', color: '#22d3ee', padding: '7px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
          >
            +15s
          </button>
          <button
            type="button"
            onClick={() => { setRestSeconds(0); setIsResting(false); }}
            style={{ backgroundColor: '#0b121f', border: '1px solid #1e2d44', color: '#64748b', padding: '7px 16px', borderRadius: '12px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
          >
            SKIP REST
          </button>
        </div>
      </div>

      {/* 5. Set Logger Cards (All weights in KG) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sets.map((set, idx) => (
          <div
            key={set.id}
            style={{
              backgroundColor: '#111b2b',
              border: idx === activeSetIdx && !set.completed ? '1.5px solid #bef264' : '1px solid #1e2d44',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: idx === activeSetIdx && !set.completed ? '0 0 14px rgba(190, 242, 100, 0.2)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: set.completed ? '#bef264' : '#ffffff' }}>
                Set {set.id}
              </span>
              <span style={{ fontSize: '10px', backgroundColor: '#0b121f', color: '#22d3ee', padding: '2px 7px', borderRadius: '6px', fontWeight: '800' }}>
                {set.type}
              </span>
            </div>

            {/* Counter Controls in KG */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Weight in KG */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => updateWeight(idx, -2.5)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0b121f', color: '#ffffff', border: '1px solid #1e2d44', cursor: 'pointer', fontWeight: '800', fontSize: '13px' }}
                >
                  -
                </button>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', minWidth: '48px', textAlign: 'center' }}>
                  {set.weight} kg
                </span>
                <button
                  type="button"
                  onClick={() => updateWeight(idx, 2.5)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0b121f', color: '#ffffff', border: '1px solid #1e2d44', cursor: 'pointer', fontWeight: '800', fontSize: '13px' }}
                >
                  +
                </button>
              </div>

              {/* Reps */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => updateReps(idx, -1)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0b121f', color: '#ffffff', border: '1px solid #1e2d44', cursor: 'pointer', fontWeight: '800', fontSize: '13px' }}
                >
                  -
                </button>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', minWidth: '44px', textAlign: 'center' }}>
                  {set.reps} reps
                </span>
                <button
                  type="button"
                  onClick={() => updateReps(idx, 1)}
                  style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#0b121f', color: '#ffffff', border: '1px solid #1e2d44', cursor: 'pointer', fontWeight: '800', fontSize: '13px' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Complete Checkbox Button */}
            <button
              type="button"
              onClick={() => handleCompleteSet(idx)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: set.completed ? '#bef264' : '#0b121f',
                color: set.completed ? '#0c1324' : '#bef264',
                border: set.completed ? 'none' : '1px solid #1e2d44',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: set.completed ? '0 0 10px rgba(190, 242, 100, 0.4)' : 'none'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 6. Complete Set / Finish Workout Button */}
      <button
        type="button"
        onClick={() => handleCompleteSet(activeSetIdx)}
        className="font-headline"
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#bef264',
          color: '#0c1324',
          border: 'none',
          borderRadius: '18px',
          fontSize: '15px',
          fontWeight: '900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 18px rgba(190, 242, 100, 0.4)'
        }}
      >
        <span>{currentSetIndex === -1 ? 'FINISH WORKOUT ✓' : `COMPLETE SET ${activeSetIdx + 1}`}</span>
      </button>
    </div>
  );
};
