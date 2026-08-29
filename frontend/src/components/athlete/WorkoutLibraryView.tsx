import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../../services/api.js';

interface WorkoutLibraryViewProps {
  onSelectExercise?: (exerciseId: string) => void;
}

export const WorkoutLibraryView: React.FC<WorkoutLibraryViewProps> = ({ onSelectExercise }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const muscles = ['All', 'CHEST', 'LATS', 'UPPER_BACK', 'FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'ABS'];
  const equipmentList = ['All', 'BARBELL', 'DUMBBELL', 'CABLE', 'BODYWEIGHT', 'MACHINE', 'PULL_UP_BAR'];
  const difficulties = ['All', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  useEffect(() => {
    loadExercises();
  }, [selectedMuscle, selectedEquipment, selectedDifficulty, searchQuery]);

  const loadExercises = async () => {
    setLoading(true);
    const res = await fetchExercises({
      muscle: selectedMuscle !== 'All' ? selectedMuscle : undefined,
      equipment: selectedEquipment !== 'All' ? selectedEquipment : undefined,
      difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
      search: searchQuery || undefined
    });
    if (res.success && res.data) {
      setExercises(res.data);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px 16px 100px 16px', maxWidth: '640px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '1px', color: '#bef264' }}>PHASE 6A • MASTER CATALOG</span>
          <h1 className="font-headline" style={{ fontSize: '26px', fontWeight: 'bold', color: '#fff', margin: '2px 0 0 0' }}>
            Exercise Library
          </h1>
        </div>
        <span style={{ backgroundColor: '#1e2638', color: '#bef264', padding: '6px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 'bold' }}>
          {exercises.length} Movements
        </span>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search by name, muscle, alias (e.g. 'RDL', 'Bench')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '12px',
            padding: '14px 44px 14px 16px',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#8f9bb3',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Row 1: Target Muscles */}
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#8f9bb3', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Muscle Group
        </span>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {muscles.map((m) => {
            const isSelected = selectedMuscle === m;
            return (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                style={{
                  backgroundColor: isSelected ? '#bef264' : '#151b2d',
                  color: isSelected ? '#0c1324' : '#8f9bb3',
                  border: isSelected ? 'none' : '1px solid #2e3447',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {m}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row 2: Equipment */}
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#8f9bb3', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Equipment
        </span>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {equipmentList.map((eq) => {
            const isSelected = selectedEquipment === eq;
            return (
              <button
                key={eq}
                onClick={() => setSelectedEquipment(eq)}
                style={{
                  backgroundColor: isSelected ? '#6ee7b7' : '#151b2d',
                  color: isSelected ? '#0c1324' : '#8f9bb3',
                  border: isSelected ? 'none' : '1px solid #2e3447',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {eq}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Row 3: Difficulty */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#8f9bb3', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
          Difficulty
        </span>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {difficulties.map((diff) => {
            const isSelected = selectedDifficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  backgroundColor: isSelected ? '#38bdf8' : '#151b2d',
                  color: isSelected ? '#0c1324' : '#8f9bb3',
                  border: isSelected ? 'none' : '1px solid #2e3447',
                  padding: '5px 12px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {diff}
              </button>
            );
          })}
        </div>
      </div>

      {/* Exercise Cards Shelf */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8f9bb3' }}>Loading master movements...</div>
      ) : exercises.length === 0 ? (
        <div style={{ backgroundColor: '#151b2d', border: '1px dashed #2e3447', borderRadius: '16px', padding: '32px', textAlign: 'center' }}>
          <p style={{ color: '#8f9bb3', margin: 0 }}>No movements matched your filters.</p>
          <button
            onClick={() => {
              setSelectedMuscle('All');
              setSelectedEquipment('All');
              setSelectedDifficulty('All');
              setSearchQuery('');
            }}
            style={{ marginTop: '12px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercises.map((ex) => (
            <div
              key={ex._id || ex.slug}
              onClick={() => onSelectExercise && onSelectExercise(ex._id || ex.slug)}
              style={{
                backgroundColor: '#151b2d',
                border: '1px solid #2e3447',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, border-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#bef264';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2e3447';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Exercise Thumbnail */}
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#1e2638', flexShrink: 0 }}>
                <img
                  src={ex.media?.thumbnail || ex.imageUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'}
                  alt={ex.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Information Body */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff', margin: '0 0 4px 0' }}>
                    {ex.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: ex.difficulty === 'ADVANCED' ? '#ef444422' : ex.difficulty === 'INTERMEDIATE' ? '#f59e0b22' : '#10b98122',
                      color: ex.difficulty === 'ADVANCED' ? '#ef4444' : ex.difficulty === 'INTERMEDIATE' ? '#f59e0b' : '#10b981'
                    }}
                  >
                    {ex.difficulty}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#8f9bb3', marginBottom: '8px' }}>
                  <span style={{ color: '#bef264', fontWeight: 'bold' }}>{Array.isArray(ex.primaryMuscles) ? ex.primaryMuscles.join(', ') : ex.primaryMuscleGroup}</span>
                  <span>•</span>
                  <span>{ex.movementPattern?.replace('_', ' ') || 'Movement'}</span>
                </div>

                {/* Tags / Equipment */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(ex.equipment || [ex.equipmentRequired]).slice(0, 2).map((eq: string, idx: number) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: '#1e2638',
                        color: '#dce1fb',
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: '500'
                      }}
                    >
                      {eq}
                    </span>
                  ))}
                  {ex.programming?.recommendedSets && (
                    <span style={{ backgroundColor: '#1e2638', color: '#6ee7b7', fontSize: '10px', padding: '2px 8px', borderRadius: '4px' }}>
                      {ex.programming.recommendedSets}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
