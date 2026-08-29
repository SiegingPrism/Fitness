import React, { useState, useEffect } from 'react';
import { fetchExerciseById, fetchExerciseAlternatives } from '../../services/api.js';

interface ExerciseDetailViewProps {
  exerciseId: string;
  onBack: () => void;
}

export const ExerciseDetailView: React.FC<ExerciseDetailViewProps> = ({ exerciseId, onBack }) => {
  const [exercise, setExercise] = useState<any>(null);
  const [alternatives, setAlternatives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [exerciseId]);

  const loadData = async () => {
    setLoading(true);
    const [exRes, altRes] = await Promise.all([
      fetchExerciseById(exerciseId),
      fetchExerciseAlternatives(exerciseId)
    ]);
    if (exRes?.success && exRes.data) {
      setExercise(exRes.data);
    }
    if (altRes?.success && altRes.data?.alternatives) {
      setAlternatives(altRes.data.alternatives);
    }
    setLoading(false);
  };

  if (loading || !exercise) {
    return (
      <div style={{ padding: '40px 16px', textAlign: 'center', color: '#8f9bb3' }}>
        Loading movement breakdown...
      </div>
    );
  }

  const primaryMuscles = Array.isArray(exercise.primaryMuscles)
    ? exercise.primaryMuscles.join(', ')
    : exercise.primaryMuscleGroup || 'Major Muscle';

  const secondaryMuscles = Array.isArray(exercise.secondaryMuscles)
    ? exercise.secondaryMuscles.join(', ')
    : (exercise.secondaryMuscleGroups || []).join(', ');

  const equipmentList = Array.isArray(exercise.equipment)
    ? exercise.equipment.join(', ')
    : exercise.equipmentRequired || 'Standard Gym';

  return (
    <div style={{ padding: '16px 16px 100px 16px', maxWidth: '640px', margin: '0 auto' }}>
      
      {/* Top Header Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <button
          onClick={onBack}
          style={{
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            color: '#fff',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          ←
        </button>
        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#8f9bb3', textTransform: 'uppercase' }}>
          Exercise Breakdown
        </span>
      </div>

      {/* Hero Media Banner */}
      <div
        style={{
          width: '100%',
          height: '220px',
          borderRadius: '20px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '20px',
          backgroundColor: '#151b2d',
          border: '1px solid #2e3447'
        }}
      >
        <img
          src={exercise.media?.thumbnail || exercise.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'}
          alt={exercise.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, #0c1324, transparent)',
            padding: '20px 16px 12px 16px'
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span
              style={{
                backgroundColor: '#bef264',
                color: '#0c1324',
                fontSize: '10px',
                fontWeight: '900',
                padding: '3px 8px',
                borderRadius: '6px',
                textTransform: 'uppercase'
              }}
            >
              {exercise.difficulty}
            </span>
            <span style={{ backgroundColor: '#1e2638', color: '#6ee7b7', fontSize: '10px', fontWeight: 'bold', padding: '3px 8px', borderRadius: '6px' }}>
              {exercise.movementPattern?.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>

      {/* Exercise Title & Description */}
      <div style={{ marginBottom: '20px' }}>
        <h1 className="font-headline" style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: '0 0 8px 0' }}>
          {exercise.name}
        </h1>
        <p style={{ color: '#8f9bb3', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>
          {exercise.description || 'Foundational athletic movement for strength and hypertrophy.'}
        </p>
      </div>

      {/* Muscle & Equipment Tags */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
          <div>
            <span style={{ color: '#8f9bb3', display: 'block', fontSize: '11px', fontWeight: 'bold' }}>PRIMARY MUSCLE</span>
            <strong style={{ color: '#bef264' }}>{primaryMuscles}</strong>
          </div>
          <div>
            <span style={{ color: '#8f9bb3', display: 'block', fontSize: '11px', fontWeight: 'bold' }}>EQUIPMENT</span>
            <strong style={{ color: '#dce1fb' }}>{equipmentList}</strong>
          </div>
          {secondaryMuscles && (
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: '#8f9bb3', display: 'block', fontSize: '11px', fontWeight: 'bold' }}>SECONDARY MUSCLES</span>
              <span style={{ color: '#c3c9b2' }}>{secondaryMuscles}</span>
            </div>
          )}
        </div>
      </div>

      {/* Programming Defaults Shelf */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Recommended Programming Defaults
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block', fontWeight: 'bold' }}>SETS & REPS</span>
            <strong style={{ fontSize: '14px', color: '#bef264' }}>
              {exercise.programming?.recommendedSets || '3-4 sets'} • {exercise.programming?.recommendedRepRange ? `${exercise.programming.recommendedRepRange.min}-${exercise.programming.recommendedRepRange.max}` : '8-12'}
            </strong>
          </div>
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block', fontWeight: 'bold' }}>REST INTERVAL</span>
            <strong style={{ fontSize: '14px', color: '#6ee7b7' }}>
              {exercise.programming?.recommendedRestSeconds || exercise.restSeconds || 90}s
            </strong>
          </div>
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block', fontWeight: 'bold' }}>INTENSITY (RPE/RIR)</span>
            <strong style={{ fontSize: '14px', color: '#38bdf8' }}>
              RPE {exercise.programming?.recommendedRPE || 8} (RIR {exercise.programming?.recommendedRIR || 2})
            </strong>
          </div>
        </div>
      </div>

      {/* Step-by-Step Execution Guide */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Step-by-Step Execution
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(exercise.instructions || exercise.executionSteps || []).map((step: string, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ backgroundColor: '#1e2638', color: '#bef264', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
                {idx + 1}
              </span>
              <p style={{ color: '#dce1fb', fontSize: '13px', lineHeight: '1.4', margin: 0 }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Coaching Cues & Common Mistakes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
        
        {/* Coaching Cues */}
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <span style={{ color: '#bef264', fontSize: '14px' }}>💡</span>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#bef264', margin: 0 }}>
              Coaching Cues
            </h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', color: '#dce1fb', fontSize: '12px', lineHeight: '1.4' }}>
            {(exercise.coachingCues || []).map((cue: string, i: number) => (
              <li key={i} style={{ marginBottom: '6px' }}>{cue}</li>
            ))}
          </ul>
        </div>

        {/* Common Mistakes */}
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
            <span style={{ color: '#ef4444', fontSize: '14px' }}>⚠️</span>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#ef4444', margin: 0 }}>
              Avoid Mistakes
            </h3>
          </div>
          <ul style={{ margin: 0, paddingLeft: '16px', color: '#fca5a5', fontSize: '12px', lineHeight: '1.4' }}>
            {(exercise.commonMistakes || []).map((mistake: string, i: number) => (
              <li key={i} style={{ marginBottom: '6px' }}>{mistake}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personal History Shelf */}
      {exercise.personalBest && (
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #bef26433', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#bef264', textTransform: 'uppercase' }}>
              🏆 Your Exercise Record
            </span>
            <span style={{ fontSize: '11px', color: '#8f9bb3' }}>PR Tracking</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div style={{ backgroundColor: '#0c1324', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block' }}>BEST WEIGHT</span>
              <strong style={{ fontSize: '15px', color: '#fff' }}>{exercise.personalBest.weightKg} kg × {exercise.personalBest.reps}</strong>
            </div>
            <div style={{ backgroundColor: '#0c1324', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block' }}>EST. 1RM</span>
              <strong style={{ fontSize: '15px', color: '#bef264' }}>{exercise.personalBest.estimated1RM} kg</strong>
            </div>
            <div style={{ backgroundColor: '#0c1324', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', color: '#8f9bb3', display: 'block' }}>TOTAL VOLUME</span>
              <strong style={{ fontSize: '15px', color: '#38bdf8' }}>{exercise.personalBest.totalVolumeKg?.toLocaleString()} kg</strong>
            </div>
          </div>
        </div>
      )}

      {/* Intelligent Alternatives Swapper */}
      {alternatives.length > 0 && (
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '16px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
            🔁 Equipment & Movement Alternatives
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {alternatives.map((alt: any, idx: number) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#0c1324',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong style={{ color: '#fff', fontSize: '13px', display: 'block' }}>{alt.name}</strong>
                  <span style={{ color: '#8f9bb3', fontSize: '11px' }}>{alt.equipment}</span>
                </div>
                <span style={{ backgroundColor: '#10b98122', color: '#10b981', fontSize: '11px', fontWeight: 'bold', padding: '2px 8px', borderRadius: '6px' }}>
                  {alt.similarityScore || alt.similarity || '90%'} match
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
