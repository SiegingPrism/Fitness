import React, { useState, useEffect } from 'react';
import { fetchExerciseById, fetchExerciseAlternatives } from '../../services/api';

interface Props {
  exerciseId: string;
  onBack: () => void;
  onSelectAlternative?: (altSlug: string) => void;
  onAddToWorkout?: (exercise: any) => void;
  onStartWorkoutWithExercise?: (exercise: any) => void;
}

export const ExerciseDetailView: React.FC<Props> = ({
  exerciseId,
  onBack,
  onSelectAlternative,
  onAddToWorkout,
  onStartWorkoutWithExercise
}) => {
  const [exercise, setExercise] = useState<any>(null);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'alternatives'>('overview');

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      const res = await fetchExerciseById(exerciseId);
      if (res?.data) {
        setExercise(res.data);
      }
      const altRes = await fetchExerciseAlternatives(exerciseId);
      if (altRes?.data?.alternatives) {
        setAlternatives(altRes.data.alternatives);
      }
      setLoading(false);
    };
    loadDetail();
  }, [exerciseId]);

  if (loading || !exercise) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#8d9882' }}>
        <p>Loading exercise breakdown...</p>
      </div>
    );
  }

  const pb = exercise.personalBest || {
    weightKg: 100,
    reps: 5,
    estimated1RM: 116,
    totalVolumeKg: 42380,
    lastPerformed: '3 days ago'
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', paddingBottom: '160px', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar with Back Button */}
      <div style={{ padding: '16px 20px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '10px',
            color: '#ffffff',
            padding: '8px 12px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
          aria-label="Back to exercises"
        >
          ←
        </button>
        <span style={{ fontSize: '12px', color: '#8d9882', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Exercise Breakdown
        </span>
      </div>

      {/* Hero Media Banner */}
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#0a0e1a', overflow: 'hidden', margin: '0 16px', borderRadius: '16px' }}>
        <img
          src={exercise.media?.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
          alt={exercise.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '11px',
            backgroundColor: '#bef264',
            color: '#0d150b',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: '800'
          }}>
            {exercise.difficulty || 'INTERMEDIATE'}
          </span>
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(21, 27, 45, 0.85)',
            color: '#38bdf8',
            padding: '4px 10px',
            borderRadius: '6px',
            fontWeight: '700',
            backdropFilter: 'blur(4px)'
          }}>
            {exercise.movementPattern?.replace('_', ' ') || 'HORIZONTAL PUSH'}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div style={{ padding: '16px 20px 8px' }}>
        <h1 className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
          {exercise.name}
        </h1>
        <p style={{ fontSize: '13px', color: '#8d9882', margin: '6px 0 12px 0', lineHeight: '1.4' }}>
          {exercise.description}
        </p>

        {/* Tab Navigation: Overview | History | Alternatives */}
        <div style={{
          display: 'flex',
          backgroundColor: '#151b2d',
          borderRadius: '12px',
          padding: '4px',
          gap: '4px',
          marginBottom: '16px'
        }}>
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'history', label: 'History' },
            { id: 'alternatives', label: 'Alternatives' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: isActive ? '#bef264' : 'transparent',
                  color: isActive ? '#0d150b' : '#8d9882',
                  fontWeight: isActive ? '800' : '600',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Muscle & Equipment Card */}
          <div style={{
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '14px',
            padding: '14px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: '#8d9882', fontWeight: '700', textTransform: 'uppercase' }}>Primary Muscle</span>
              <p style={{ fontSize: '13px', color: '#bef264', fontWeight: 'bold', margin: '2px 0 0 0' }}>
                {exercise.primaryMuscles?.join(', ') || 'CHEST'}
              </p>
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <p style={{ fontSize: '11px', color: '#8d9882', margin: '4px 0 0 0' }}>
                  Secondary: {exercise.secondaryMuscles.join(', ')}
                </p>
              )}
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#8d9882', fontWeight: '700', textTransform: 'uppercase' }}>Equipment</span>
              <p style={{ fontSize: '13px', color: '#ffffff', fontWeight: 'bold', margin: '2px 0 0 0' }}>
                {exercise.equipment?.join(', ') || 'BARBELL, BENCH'}
              </p>
            </div>
          </div>

          {/* Programming Defaults */}
          <div>
            <h4 style={{ fontSize: '12px', color: '#8d9882', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700', letterSpacing: '0.05em' }}>
              Recommended Programming Defaults
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#8d9882', fontWeight: '700' }}>SETS & REPS</span>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#bef264', margin: '4px 0 0 0' }}>
                  {exercise.programming?.recommendedSets || '3-4 sets'} • {exercise.programming?.recommendedRepRange ? `${exercise.programming.recommendedRepRange.min}-${exercise.programming.recommendedRepRange.max}` : '8-12'}
                </p>
              </div>
              <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#8d9882', fontWeight: '700' }}>REST INTERVAL</span>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>
                  {exercise.programming?.recommendedRestSeconds || 120}s
                </p>
              </div>
              <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', color: '#8d9882', fontWeight: '700' }}>INTENSITY (RPE)</span>
                <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#f59e0b', margin: '4px 0 0 0' }}>
                  RPE {exercise.programming?.recommendedRPE || 8}
                </p>
              </div>
            </div>
          </div>

          {/* Setup & Breathing Guide */}
          {(exercise.setupInstructions || exercise.breathingInstructions) && (
            <div style={{
              backgroundColor: '#121824',
              border: '1px solid #233044',
              borderRadius: '14px',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {exercise.setupInstructions && (
                <div>
                  <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700' }}>🔧 Setup: </span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{exercise.setupInstructions}</span>
                </div>
              )}
              {exercise.breathingInstructions && (
                <div>
                  <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '700' }}>💨 Breathing: </span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{exercise.breathingInstructions}</span>
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Instructions */}
          <div style={{
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '14px',
            padding: '16px'
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0' }}>
              Step-by-Step Execution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exercise.instructions?.map((step: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: '#1e293b',
                    color: '#38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <p style={{ fontSize: '13px', color: '#cbd5e1', margin: 0, lineHeight: '1.4' }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Cues & Common Mistakes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Cues */}
            <div style={{ backgroundColor: '#131e14', border: '1px solid #284221', borderRadius: '12px', padding: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#bef264' }}>💡 Coaching Cues</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#cbd5e1' }}>
                {exercise.coachingCues?.map((cue: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{cue}</li>
                ))}
              </ul>
            </div>

            {/* Mistakes */}
            <div style={{ backgroundColor: '#1e1414', border: '1px solid #4a1d1d', borderRadius: '12px', padding: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ffb4ab' }}>⚠️ Avoid Mistakes</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#cbd5e1' }}>
                {exercise.commonMistakes?.map((mistake: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{mistake}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HISTORY */}
      {activeTab === 'history' && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* PR Trophy Shelf */}
          <div style={{
            backgroundColor: '#192212',
            border: '1px solid #364d26',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <span style={{ fontSize: '32px' }}>🏆</span>
            <div>
              <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '800', textTransform: 'uppercase' }}>ALL-TIME BEST</span>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', margin: '2px 0 0 0' }}>
                {pb.weightKg} kg × {pb.reps} reps
              </h3>
              <p style={{ fontSize: '11px', color: '#8d9882', margin: '2px 0 0 0' }}>Achieved {pb.lastPerformed}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '14px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: '#8d9882', fontWeight: '700' }}>ESTIMATED 1RM</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#bef264', margin: '4px 0 0 0' }}>
                {pb.estimated1RM} kg
              </p>
              <span style={{ fontSize: '11px', color: '#38bdf8' }}>+4.5% vs last month</span>
            </div>

            <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '14px', padding: '14px' }}>
              <span style={{ fontSize: '11px', color: '#8d9882', fontWeight: '700' }}>TOTAL LIFETIME VOLUME</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '4px 0 0 0' }}>
                {pb.totalVolumeKg?.toLocaleString()} kg
              </p>
              <span style={{ fontSize: '11px', color: '#8d9882' }}>Over 32 sessions</span>
            </div>
          </div>

          {/* Mini Progression Trend */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '14px', padding: '16px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 12px 0' }}>
              Estimated 1RM Trend (Last 6 Weeks)
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px', paddingTop: '10px' }}>
              {[105, 107.5, 110, 110, 112.5, 116].map((val, i) => {
                const heightPercent = ((val - 100) / 20) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{
                      width: '100%',
                      height: `${Math.max(20, heightPercent)}%`,
                      backgroundColor: i === 5 ? '#bef264' : '#1e293b',
                      borderRadius: '4px'
                    }} />
                    <span style={{ fontSize: '9px', color: '#8d9882' }}>W{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALTERNATIVES */}
      {activeTab === 'alternatives' && (
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: '#8d9882', margin: '0 0 4px 0' }}>
            Intelligent biomechanical alternatives based on movement pattern, targeted muscle load, and equipment availability.
          </p>

          {alternatives.length === 0 && (
            <p style={{ fontSize: '13px', color: '#8d9882' }}>No alternatives configured.</p>
          )}

          {alternatives.map((alt: any, index: number) => {
            const stars = alt.similarityScore >= 90 ? '★★★★★' : '★★★★☆';
            return (
              <div
                key={alt.exerciseId || index}
                onClick={() => {
                  if (onSelectAlternative) onSelectAlternative(alt.exerciseId);
                }}
                style={{
                  backgroundColor: '#151b2d',
                  border: '1px solid #2e3447',
                  borderRadius: '14px',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>
                      {alt.name}
                    </h4>
                    <span style={{ fontSize: '11px', color: '#fde047' }}>{stars}</span>
                  </div>
                  <p style={{ fontSize: '11px', color: '#bef264', margin: '3px 0 0 0' }}>
                    Requires: {alt.equipment || 'DUMBBELL'}
                  </p>
                  {alt.matchReason && (
                    <p style={{ fontSize: '11px', color: '#8d9882', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                      {alt.matchReason}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#1f293d',
                    border: '1px solid #334155',
                    color: '#38bdf8',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  View ➔
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Action Bar: Train Now / Start This Exercise */}
      <div style={{
        position: 'fixed',
        bottom: '76px',
        left: '16px',
        right: '16px',
        maxWidth: '440px',
        margin: '0 auto',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <button
          type="button"
          onClick={() => {
            if (onStartWorkoutWithExercise) {
              onStartWorkoutWithExercise(exercise);
            } else if (onAddToWorkout) {
              onAddToWorkout(exercise);
            }
          }}
          style={{
            width: '100%',
            backgroundColor: '#bef264',
            color: '#0c1324',
            border: 'none',
            borderRadius: '16px',
            padding: '14px 20px',
            fontSize: '14px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(190, 242, 100, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            letterSpacing: '0.4px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span>START THIS EXERCISE (TRAIN NOW)</span>
        </button>

        {onAddToWorkout && (
          <button
            type="button"
            onClick={() => onAddToWorkout(exercise)}
            style={{
              width: '100%',
              backgroundColor: '#162236',
              color: '#38bdf8',
              border: '1px solid #24324a',
              borderRadius: '12px',
              padding: '10px',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>+ Add to Routine</span>
          </button>
        )}
      </div>
    </div>
  );
};
