import React, { useState, useEffect } from 'react';
import { logWorkout } from '../../services/api.js';

interface Props {
  onCompleteWorkout: () => void;
  onCancel: () => void;
}

export const ActiveWorkoutView: React.FC<Props> = ({ onCompleteWorkout, onCancel }) => {
  const [sessionSeconds, setSessionSeconds] = useState(2535); // 00:42:15
  const [restSeconds, setRestSeconds] = useState(72); // 01:12
  const [isResting, setIsResting] = useState(true);
  const [exerciseName, setExerciseName] = useState('Incline Bench Press');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [sets, setSets] = useState([
    { id: 1, type: 'Warm-up', weight: 135, reps: 10, rir: 3, rpe: 7, completed: true },
    { id: 2, type: 'Working Set', weight: 185, reps: 8, rir: 2, rpe: 8, completed: true },
    { id: 3, type: 'Working Set', weight: 195, reps: 6, rir: 1, rpe: 9, completed: false },
    { id: 4, type: 'Dropset', weight: 155, reps: 10, rir: 0, rpe: 10, completed: false }
  ]);

  const alternatives = [
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
        setRestSeconds((prev) => {
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
    setToastMessage(`✓ Set ${index + 1} Logged! (Volume: ${newSets[index].weight * newSets[index].reps} lbs)`);
    setTimeout(() => setToastMessage(null), 2500);

    const allCompleted = newSets.every((s) => s.completed);
    if (allCompleted) {
      logWorkout({
        exerciseName,
        sets: newSets,
        durationMinutes: Math.round(sessionSeconds / 60),
        totalVolumeKg: 8420
      });
      onCompleteWorkout();
    }
  };

  const updateWeight = (index: number, delta: number) => {
    const newSets = [...sets];
    newSets[index].weight = Math.max(0, newSets[index].weight + delta);
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
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #bef264', color: '#bef264', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 4px 12px rgba(190, 242, 100, 0.2)' }}>
          {toastMessage}
        </div>
      )}

      {/* 1. Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onCancel} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
        </button>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase', letterSpacing: '0.5px' }}>WORKOUT IN PROGRESS</div>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{formatTime(sessionSeconds)}</div>
        </div>

        <button onClick={() => setShowSwapModal(true)} style={{ backgroundColor: '#191f31', border: '1px solid #3cddc7', color: '#3cddc7', padding: '6px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
          Swap Move
        </button>
      </div>

      {/* Swap Exercise Modal */}
      {showSwapModal && (
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #3cddc7', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff' }}>Smart Exercise Swap</span>
            <span onClick={() => setShowSwapModal(false)} style={{ color: '#8d9882', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>Close</span>
          </div>
          <p style={{ fontSize: '12px', color: '#8d9882' }}>Choose a compatible movement pattern replacement:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alternatives.map((alt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setExerciseName(alt.name);
                  setShowSwapModal(false);
                  setToastMessage(`Swapped to ${alt.name}!`);
                  setTimeout(() => setToastMessage(null), 2500);
                }}
                style={{ backgroundColor: '#191f31', border: '1px solid #2e3447', borderRadius: '12px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>{alt.name}</div>
                  <div style={{ fontSize: '11px', color: '#8d9882' }}>{alt.equipment} • <span style={{ color: '#bef264' }}>{alt.similarity}</span></div>
                </div>
                <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '18px' }}>swap_horiz</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Hero Exercise Header Card */}
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #2e3447',
        minHeight: '140px',
        backgroundImage: 'linear-gradient(to top, rgba(12, 19, 36, 0.95), rgba(12, 19, 36, 0.2)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '6px' }}>
            CHEST • HORIZONTAL PUSH
          </span>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3cddc7' }}>
            Set {activeSetIdx + 1} of {sets.length}
          </span>
        </div>

        <div>
          <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>{exerciseName}</h2>
          <div style={{ fontSize: '12px', color: '#dce1fb', marginTop: '2px' }}>
            Target: <strong>3-4 sets × 6-8 reps @ RIR 2</strong>
          </div>
        </div>
      </div>

      {/* 3. Progressive Overload Advice Banner */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '22px' }}>auto_awesome</span>
        <div style={{ fontSize: '12px', color: '#dce1fb' }}>
          <strong>Progression Goal:</strong> Hit 8 reps on set 3 to unlock +2.5 kg next session.
        </div>
      </div>

      {/* 4. Circular Rest Timer Gauge */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="50" stroke="#191f31" strokeWidth="8" fill="none" />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="#3cddc7"
              strokeWidth="8"
              strokeDasharray="314"
              strokeDashoffset={314 - (314 * (restSeconds / 90))}
              strokeLinecap="round"
              fill="none"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>{formatTime(restSeconds)}</div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#3cddc7', textTransform: 'uppercase' }}>RESTING</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setRestSeconds((prev) => prev + 15)} style={{ backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            +15s
          </button>
          <button onClick={() => { setRestSeconds(0); setIsResting(false); }} style={{ backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#8d9882', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
            SKIP REST
          </button>
        </div>
      </div>

      {/* 5. Set Logger Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {sets.map((set, idx) => (
          <div
            key={set.id}
            style={{
              backgroundColor: '#151b2d',
              border: idx === activeSetIdx && !set.completed ? '2px solid #bef264' : '1px solid #2e3447',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: set.completed ? '#bef264' : '#ffffff' }}>
                Set {set.id}
              </span>
              <span style={{ fontSize: '10px', backgroundColor: '#191f31', color: '#3cddc7', padding: '2px 6px', borderRadius: '6px', fontWeight: 'bold' }}>
                {set.type}
              </span>
            </div>

            {/* Counter Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button onClick={() => updateWeight(idx, -5)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#191f31', color: '#ffffff', border: '1px solid #2e3447', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>{set.weight} lbs</span>
                <button onClick={() => updateWeight(idx, 5)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#191f31', color: '#ffffff', border: '1px solid #2e3447', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button onClick={() => updateReps(idx, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#191f31', color: '#ffffff', border: '1px solid #2e3447', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>{set.reps} reps</span>
                <button onClick={() => updateReps(idx, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#191f31', color: '#ffffff', border: '1px solid #2e3447', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
              </div>
            </div>

            {/* Complete Checkbox Button */}
            <button
              onClick={() => handleCompleteSet(idx)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: set.completed ? '#bef264' : '#191f31',
                color: set.completed ? '#0c1324' : '#bef264',
                border: '1px solid #2e3447',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {set.completed ? 'check' : 'check'}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* 6. Complete Set / Finish Workout Button */}
      <button
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
          boxShadow: '0 4px 16px rgba(190, 242, 100, 0.4)'
        }}
      >
        <span>{currentSetIndex === -1 ? 'FINISH WORKOUT ✓' : `COMPLETE SET ${activeSetIdx + 1}`}</span>
      </button>
    </div>
  );
};
