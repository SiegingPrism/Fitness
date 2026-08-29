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
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b', fontFamily: 'Inter, sans-serif' }}>
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
    <div style={{ maxWidth: '440px', margin: '0 auto', paddingBottom: '160px', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar with Back Button */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            backgroundColor: '#111b2b',
            border: '1px solid #1e2d44',
            borderRadius: '12px',
            color: '#ffffff',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Back to exercises"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
        <span style={{ fontSize: '11px', color: '#06b6d4', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
          Exercise Breakdown
        </span>
      </div>

      {/* Hero Media Banner */}
      <div style={{ position: 'relative', height: '220px', backgroundColor: '#0b121f', overflow: 'hidden', margin: '0 16px', borderRadius: '22px', border: '1px solid #1e2d44' }}>
        <img
          src={exercise.media?.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80'}
          alt={exercise.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '14px',
          left: '14px',
          display: 'flex',
          gap: '8px'
        }}>
          <span style={{
            fontSize: '11px',
            backgroundColor: '#bef264',
            color: '#0c1324',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: '900'
          }}>
            {exercise.difficulty || 'INTERMEDIATE'}
          </span>
          <span style={{
            fontSize: '11px',
            backgroundColor: 'rgba(11, 18, 31, 0.85)',
            color: '#22d3ee',
            padding: '4px 10px',
            borderRadius: '8px',
            fontWeight: '800',
            border: '1px solid #1e2d44',
            backdropFilter: 'blur(6px)'
          }}>
            {exercise.movementPattern?.replace('_', ' ') || 'HORIZONTAL PUSH'}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div style={{ padding: '16px 16px 8px' }}>
        <h1 className="font-headline" style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>
          {exercise.name}
        </h1>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '6px 0 14px 0', lineHeight: '1.4' }}>
          {exercise.description}
        </p>

        {/* Tab Navigation: Overview | History | Alternatives */}
        <div style={{
          display: 'flex',
          backgroundColor: '#111b2b',
          border: '1px solid #1e2d44',
          borderRadius: '14px',
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
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: isActive ? '#06b6d4' : 'transparent',
                  color: isActive ? '#0c1324' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
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
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Muscle & Equipment Card */}
          <div style={{
            backgroundColor: '#111b2b',
            border: '1px solid #1e2d44',
            borderRadius: '18px',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px'
          }}>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Primary Muscle</span>
              <p style={{ fontSize: '14px', color: '#22d3ee', fontWeight: '800', margin: '2px 0 0 0' }}>
                {exercise.primaryMuscles?.join(', ') || 'CHEST'}
              </p>
              {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>
                  Secondary: {exercise.secondaryMuscles.join(', ')}
                </p>
              )}
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Equipment</span>
              <p style={{ fontSize: '14px', color: '#ffffff', fontWeight: '800', margin: '2px 0 0 0' }}>
                {exercise.equipment?.join(', ') || 'BARBELL, BENCH'}
              </p>
            </div>
          </div>

          {/* Programming Defaults */}
          <div>
            <h4 style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>
              Recommended Programming Defaults
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px 8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '800' }}>SETS & REPS</span>
                <p style={{ fontSize: '13px', fontWeight: '800', color: '#bef264', margin: '4px 0 0 0' }}>
                  {exercise.programming?.recommendedSets || '3-4 sets'} • {exercise.programming?.recommendedRepRange ? `${exercise.programming.recommendedRepRange.min}-${exercise.programming.recommendedRepRange.max}` : '8-12'}
                </p>
              </div>
              <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px 8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '800' }}>REST INTERVAL</span>
                <p style={{ fontSize: '13px', fontWeight: '800', color: '#22d3ee', margin: '4px 0 0 0' }}>
                  {exercise.programming?.recommendedRestSeconds || 120}s
                </p>
              </div>
              <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '14px', padding: '12px 8px', textAlign: 'center' }}>
                <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '800' }}>INTENSITY</span>
                <p style={{ fontSize: '13px', fontWeight: '800', color: '#f59e0b', margin: '4px 0 0 0' }}>
                  RPE {exercise.programming?.recommendedRPE || 8}
                </p>
              </div>
            </div>
          </div>

          {/* Setup & Breathing Guide */}
          {(exercise.setupInstructions || exercise.breathingInstructions) && (
            <div style={{
              backgroundColor: '#111b2b',
              border: '1px solid #1e2d44',
              borderRadius: '16px',
              padding: '14px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {exercise.setupInstructions && (
                <div>
                  <span style={{ fontSize: '11px', color: '#22d3ee', fontWeight: '800' }}>Setup: </span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{exercise.setupInstructions}</span>
                </div>
              )}
              {exercise.breathingInstructions && (
                <div>
                  <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '800' }}>Breathing: </span>
                  <span style={{ fontSize: '12px', color: '#cbd5e1' }}>{exercise.breathingInstructions}</span>
                </div>
              )}
            </div>
          )}

          {/* Step-by-Step Instructions */}
          <div style={{
            backgroundColor: '#111b2b',
            border: '1px solid #1e2d44',
            borderRadius: '18px',
            padding: '18px'
          }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0' }}>
              Step-by-Step Execution
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exercise.instructions?.map((step: string, idx: number) => (
                <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: '#0b121f',
                    border: '1px solid #1e2d44',
                    color: '#22d3ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: '800',
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
            <div style={{ backgroundColor: '#111b2b', border: '1px solid #2f4023', borderRadius: '16px', padding: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#bef264' }}>Coaching Cues</span>
              <ul style={{ margin: '6px 0 0 0', paddingLeft: '16px', fontSize: '12px', color: '#cbd5e1' }}>
                {exercise.coachingCues?.map((cue: string, idx: number) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{cue}</li>
                ))}
              </ul>
            </div>

            {/* Mistakes */}
            <div style={{ backgroundColor: '#111b2b', border: '1px solid #4a1d1d', borderRadius: '16px', padding: '14px' }}>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#f87171' }}>Avoid Mistakes</span>
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
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* PR Trophy Shelf */}
          <div style={{
            backgroundColor: '#111b2b',
            border: '1px solid #1e2d44',
            borderRadius: '18px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#0b121f', border: '1.5px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ALL-TIME BEST</span>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#bef264', margin: '2px 0 0 0' }}>
                {pb.weightKg} kg × {pb.reps} reps
              </h3>
              <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0 0' }}>Achieved {pb.lastPerformed}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '16px', padding: '14px' }}>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>ESTIMATED 1RM</span>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#22d3ee', margin: '4px 0 0 0' }}>
                {pb.estimated1RM} kg
              </p>
              <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '700' }}>+4.5% vs last month</span>
            </div>

            <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '16px', padding: '14px' }}>
              <span style={{ fontSize: '10px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>LIFETIME VOLUME</span>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '4px 0 0 0' }}>
                {pb.totalVolumeKg?.toLocaleString()} kg
              </p>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Over 32 sessions</span>
            </div>
          </div>

          {/* Mini Progression Trend */}
          <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '18px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', margin: '0 0 12px 0' }}>
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
                      backgroundColor: i === 5 ? '#06b6d4' : '#162236',
                      borderRadius: '6px',
                      boxShadow: i === 5 ? '0 0 10px rgba(6, 182, 212, 0.4)' : 'none'
                    }} />
                    <span style={{ fontSize: '9px', color: '#64748b', fontWeight: '700' }}>W{i + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ALTERNATIVES */}
      {activeTab === 'alternatives' && (
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 4px 0' }}>
            Intelligent biomechanical alternatives based on movement pattern, targeted muscle load, and equipment availability.
          </p>

          {alternatives.length === 0 && (
            <p style={{ fontSize: '13px', color: '#64748b' }}>No alternatives configured.</p>
          )}

          {alternatives.map((alt: any, index: number) => {
            return (
              <div
                key={alt.exerciseId || index}
                onClick={() => {
                  if (onSelectAlternative) onSelectAlternative(alt.exerciseId);
                }}
                style={{
                  backgroundColor: '#111b2b',
                  border: '1px solid #1e2d44',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
                      {alt.name}
                    </h4>
                  </div>
                  <p style={{ fontSize: '11px', color: '#22d3ee', margin: '3px 0 0 0', fontWeight: '700' }}>
                    Requires: {alt.equipment || 'DUMBBELL'}
                  </p>
                  {alt.matchReason && (
                    <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                      {alt.matchReason}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  style={{
                    backgroundColor: '#162236',
                    border: '1px solid #24324a',
                    color: '#22d3ee',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    fontSize: '11px',
                    fontWeight: '800',
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
              backgroundColor: '#111b2b',
              color: '#06b6d4',
              border: '1px solid #1e2d44',
              borderRadius: '12px',
              padding: '10px',
              fontSize: '12px',
              fontWeight: '800',
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
