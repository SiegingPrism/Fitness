import React, { useState } from 'react';

interface Props {
  exerciseId?: string;
  onBack: () => void;
  onSelectAlternative?: (altName: string) => void;
}

export const ExerciseDetailView: React.FC<Props> = ({ exerciseId = 'ex_1', onBack, onSelectAlternative }) => {
  const [activeTab, setActiveTab] = useState<'GUIDE' | 'HISTORY' | 'ALTERNATIVES'>('GUIDE');

  const exercise = {
    id: exerciseId,
    name: 'Barbell Bench Press',
    category: 'Chest',
    movementPattern: 'Horizontal Push',
    difficulty: 'INTERMEDIATE',
    primaryMuscle: 'Pectoralis Major',
    secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoid'],
    equipment: 'Barbell & Flat Bench',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    setup: 'Lie flat on bench with eyes under the bar. Retract scapulae and plant feet firmly into the floor.',
    executionSteps: [
      'Unrack barbell with straight locked arms over chest',
      'Inhale deeply and lower bar with controlled 3-second tempo to sternum',
      'Lightly touch chest without bouncing off ribs',
      'Drive forcefully upwards, pressing slightly back toward rack'
    ],
    coachingCues: [
      'Keep shoulder blades tightly pinched together throughout',
      'Maintain active leg drive through heels',
      'Control eccentric phase; do not bounce bar off chest'
    ],
    commonMistakes: [
      'Excessive lower back arch beyond natural curvature',
      'Flaring elbows out at 90 degrees (keep at 45–60 degrees)',
      'Losing upper back tension at the bottom of the movement'
    ],
    personalRecords: {
      estimated1RM: '116 kg',
      topSet: '100 kg × 5 reps',
      totalVolume: '42,380 kg',
      lastTrained: 'Yesterday (Push Day)'
    },
    alternatives: [
      { id: 'ex_2', name: 'Dumbbell Bench Press', equipment: 'Dumbbells & Bench', match: '95% Match' },
      { id: 'ex_3', name: 'Incline Dumbbell Press', equipment: 'Dumbbells & Incline Bench', match: '90% Match' },
      { id: 'ex_4', name: 'Plate-Loaded Chest Press', equipment: 'Machine', match: '85% Match' },
      { id: 'ex_5', name: 'Weighted Push-Ups', equipment: 'Bodyweight / Plates', match: '80% Match' }
    ]
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          </button>
          <h1 className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>Exercise Breakdown</h1>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>bookmark</span>
        </button>
      </div>

      {/* 2. Media Showcase Hero Card */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #2e3447',
        minHeight: '220px',
        backgroundImage: `linear-gradient(to top, rgba(12, 19, 36, 0.95), rgba(12, 19, 36, 0.2)), url("${exercise.imageUrl}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px' }}>
            {exercise.movementPattern}
          </span>
          <span style={{ backgroundColor: '#151b2d', color: '#3cddc7', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px', border: '1px solid #2e3447' }}>
            {exercise.difficulty}
          </span>
        </div>

        <div>
          <h2 className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>{exercise.name}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '12px', color: '#dce1fb' }}>
            <span style={{ color: '#bef264', fontWeight: 'bold' }}>{exercise.primaryMuscle}</span>
            <span>•</span>
            <span style={{ color: '#8d9882' }}>{exercise.equipment}</span>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '4px' }}>
        {[
          { id: 'GUIDE', label: 'Form Guide' },
          { id: 'HISTORY', label: 'My PRs' },
          { id: 'ALTERNATIVES', label: 'Alternatives' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '10px',
              borderRadius: '12px',
              backgroundColor: activeTab === tab.id ? '#bef264' : 'transparent',
              color: activeTab === tab.id ? '#0c1324' : '#8d9882',
              fontWeight: 'bold',
              fontSize: '12px',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: FORM GUIDE */}
      {activeTab === 'GUIDE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* How to Perform */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#bef264' }}>How to Perform</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {exercise.executionSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#ffffff' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#191f31', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Coaching Cues */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#3cddc7' }}>💡 Coaching Cues</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {exercise.coachingCues.map((cue, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#dce1fb' }}>
                  <span style={{ color: '#3cddc7', fontWeight: 'bold' }}>•</span>
                  <span>{cue}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #ff5c5c', borderRadius: '20px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h3 className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#ff5c5c' }}>⚠️ Common Mistakes</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {exercise.commonMistakes.map((mistake, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: '#ffb4ab' }}>
                  <span style={{ color: '#ff5c5c', fontWeight: 'bold' }}>✕</span>
                  <span>{mistake}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY PRS & HISTORY */}
      {activeTab === 'HISTORY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#8d9882', textTransform: 'uppercase', fontWeight: 'bold' }}>Estimated 1RM</div>
              <div className="font-headline" style={{ fontSize: '24px', fontWeight: '900', color: '#bef264', marginTop: '4px' }}>{exercise.personalRecords.estimated1RM}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#8d9882', textTransform: 'uppercase', fontWeight: 'bold' }}>Best Set (5RM)</div>
              <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{exercise.personalRecords.topSet}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#8d9882', textTransform: 'uppercase', fontWeight: 'bold' }}>Lifetime Volume</div>
              <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#3cddc7', marginTop: '4px' }}>{exercise.personalRecords.totalVolume}</div>
            </div>
            <div>
              <div style={{ fontSize: '11px', color: '#8d9882', textTransform: 'uppercase', fontWeight: 'bold' }}>Last Trained</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff', marginTop: '4px' }}>{exercise.personalRecords.lastTrained}</div>
            </div>
          </div>

          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '28px' }}>trending_up</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>Progressive Overload Target</div>
              <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px' }}>Next session: 102.5 kg × 4–6 reps</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SMART ALTERNATIVES */}
      {activeTab === 'ALTERNATIVES' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '13px', color: '#8d9882' }}>
            Need to swap? Choose an equipment-matched movement pattern alternative:
          </div>

          {exercise.alternatives.map((alt) => (
            <div
              key={alt.id}
              style={{
                backgroundColor: '#151b2d',
                border: '1px solid #2e3447',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>{alt.name}</div>
                <div style={{ fontSize: '11px', color: '#8d9882', marginTop: '2px' }}>{alt.equipment} • <span style={{ color: '#bef264' }}>{alt.match}</span></div>
              </div>
              <button
                onClick={() => {
                  if (onSelectAlternative) onSelectAlternative(alt.name);
                  onBack();
                }}
                style={{
                  backgroundColor: '#191f31',
                  border: '1px solid #bef264',
                  color: '#bef264',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Swap In
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <button
        onClick={onBack}
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
        <span>Add Exercise to Routine</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>add</span>
      </button>
    </div>
  );
};
