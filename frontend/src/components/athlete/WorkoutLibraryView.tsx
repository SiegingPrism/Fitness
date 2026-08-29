import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchExercises,
  type ExerciseFilter
} from '../../services/api';

interface Props {
  onSelectExercise: (exerciseId: string) => void;
  onStartExerciseWorkout?: (exercise: any) => void;
  mode?: 'BROWSE' | 'PICKER' | 'REPLACE';
  replacingExerciseName?: string;
  onAddExerciseToWorkout?: (exercise: any, config: { sets: number; reps: number; rest: number; rpe: number }) => void;
  onReplaceExerciseInWorkout?: (newExercise: any) => void;
}

const MUSCLE_OPTIONS = ['CHEST', 'LATS', 'UPPER_BACK', 'LOWER_BACK', 'FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS', 'BICEPS', 'TRICEPS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'FOREARMS', 'ABS'];
const EQUIPMENT_OPTIONS = ['BARBELL', 'DUMBBELL', 'CABLE', 'MACHINE', 'BODYWEIGHT', 'BENCH', 'PULL_UP_BAR', 'KETTLEBELL', 'RESISTANCE_BAND', 'PLYO_BOX', 'MEDICINE_BALL', 'BATTLE_ROPE', 'SWISS_BALL', 'GYMNASTIC_RINGS'];
const DIFFICULTY_OPTIONS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const MOVEMENT_OPTIONS = ['HORIZONTAL_PUSH', 'VERTICAL_PUSH', 'HORIZONTAL_PULL', 'VERTICAL_PULL', 'SQUAT', 'HINGE', 'LUNGE', 'CARRY', 'ROTATION', 'ANTI_ROTATION', 'FLEXION', 'EXTENSION', 'ISOLATION'];

const BODY_PARTS_BURGER_MENU = [
  {
    id: 'ALL',
    label: 'All Movements',
    sub: 'Full 317 exercise library',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    )
  },
  {
    id: 'CHEST',
    label: 'Chest',
    sub: 'Pectoralis Major & Minor, Incline, Dips',
    muscles: ['CHEST'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6"></path>
        <path d="M12 3v12"></path>
        <rect x="4" y="18" width="16" height="3" rx="1.5"></rect>
      </svg>
    )
  },
  {
    id: 'BACK',
    label: 'Back & Lats',
    sub: 'Lats, Upper Back, Traps & Rhomboids',
    muscles: ['LATS', 'UPPER_BACK', 'LOWER_BACK'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 19 21 12 17 5 21 12 2"></polygon>
      </svg>
    )
  },
  {
    id: 'SHOULDERS',
    label: 'Shoulders',
    sub: 'Front, Lateral & Rear Deltoids',
    muscles: ['FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    )
  },
  {
    id: 'ARMS',
    label: 'Arms & Forearms',
    sub: 'Biceps, Triceps, Brachialis & Grip',
    muscles: ['BICEPS', 'TRICEPS', 'FOREARMS'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
      </svg>
    )
  },
  {
    id: 'LEGS',
    label: 'Legs & Quads',
    sub: 'Quadriceps, Hamstrings & Calves',
    muscles: ['QUADS', 'HAMSTRINGS', 'CALVES'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      </svg>
    )
  },
  {
    id: 'GLUTES',
    label: 'Glutes & Hips',
    sub: 'Gluteus Maximus, Medius & Hip Thrusts',
    muscles: ['GLUTES'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"></circle>
        <path d="M12 3v18"></path>
      </svg>
    )
  },
  {
    id: 'CORE',
    label: 'Core & Abs',
    sub: 'Rectus Abdominis, Obliques & Lower Back',
    muscles: ['ABS', 'LOWER_BACK'],
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },
  {
    id: 'FULL_BODY',
    label: 'Full Body & HIIT',
    sub: 'Olympic lifts, Conditioning & Cardio',
    category: 'CONDITIONING',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    )
  },
  {
    id: 'MOBILITY',
    label: 'Mobility & Rehab',
    sub: 'Warm-ups, Flexibility & Active Recovery',
    category: 'MOBILITY',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      </svg>
    )
  }
];

const CLASSIFICATION_TABS = [
  { id: 'ALL', label: 'All' },
  { id: 'CHEST', label: 'Chest', muscles: ['CHEST'] },
  { id: 'BACK', label: 'Back', muscles: ['LATS', 'UPPER_BACK', 'LOWER_BACK'] },
  { id: 'SHOULDERS', label: 'Shoulders', muscles: ['FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS'] },
  { id: 'ARMS', label: 'Arms', muscles: ['BICEPS', 'TRICEPS', 'FOREARMS'] },
  { id: 'LEGS', label: 'Legs', muscles: ['QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES'] },
  { id: 'CORE', label: 'Core', muscles: ['ABS'] },
  { id: 'FULL_BODY', label: 'Full Body', category: 'CONDITIONING' }
];

export const WorkoutLibraryView: React.FC<Props> = ({
  onSelectExercise,
  onStartExerciseWorkout,
  mode = 'BROWSE',
  replacingExerciseName,
  onAddExerciseToWorkout,
  onReplaceExerciseInWorkout
}) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMovements, setTotalMovements] = useState(0);

  // Active Classification Tab
  const [activeClassification, setActiveClassification] = useState<string>('ALL');

  // Burger Menu State
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  // Search state with debounce
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const requestSeq = useRef(0);

  // Multi-Filter Bottom Sheet State
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedMovements, setSelectedMovements] = useState<string[]>([]);

  // Quick Add Modal state (for Workout Builder Mode)
  const [configExercise, setConfigExercise] = useState<any | null>(null);
  const [configSets, setConfigSets] = useState(3);
  const [configReps, setConfigReps] = useState(10);
  const [configRest, setConfigRest] = useState(90);
  const [configRPE, setConfigRPE] = useState(8);

  // 300ms Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const currentSeq = ++requestSeq.current;

    try {
      const activeConfig = BODY_PARTS_BURGER_MENU.find((t) => t.id === activeClassification);
      const filter: ExerciseFilter = {
        search: debouncedSearch.trim() || undefined,
        category: activeConfig?.category,
        muscles: activeConfig?.muscles || (selectedMuscles.length > 0 ? selectedMuscles : undefined),
        equipment: selectedEquipment.length > 0 ? selectedEquipment : undefined,
        difficulty: selectedDifficulties.length > 0 ? selectedDifficulties : undefined,
        movementPatterns: selectedMovements.length > 0 ? selectedMovements : undefined
      };

      const res = await fetchExercises(filter);
      if (currentSeq === requestSeq.current) {
        if (res.success) {
          setExercises(res.data || []);
          setTotalMovements(res.total || res.data?.length || 0);
        } else {
          setError('Failed to load exercises');
        }
      }
    } catch (err) {
      if (currentSeq === requestSeq.current) {
        setError('Network unavailable. Tap retry below.');
      }
    } finally {
      if (currentSeq === requestSeq.current) {
        setLoading(false);
      }
    }
  }, [activeClassification, debouncedSearch, selectedMuscles, selectedEquipment, selectedDifficulties, selectedMovements]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenConfig = (e: React.MouseEvent, exercise: any) => {
    e.stopPropagation();
    setConfigExercise(exercise);
    setConfigSets(exercise.programming?.recommendedSets ? 3 : 3);
    setConfigReps(exercise.programming?.recommendedRepRange?.max || 10);
    setConfigRest(exercise.programming?.recommendedRestSeconds || 90);
    setConfigRPE(exercise.programming?.recommendedRPE || 8);
  };

  const handleConfirmAdd = () => {
    if (configExercise && onAddExerciseToWorkout) {
      onAddExerciseToWorkout(configExercise, {
        sets: configSets,
        reps: configReps,
        rest: configRest,
        rpe: configRPE
      });
      setConfigExercise(null);
    }
  };

  const totalActiveFilters =
    selectedMuscles.length + selectedEquipment.length + selectedDifficulties.length + selectedMovements.length;

  const clearAllFilters = () => {
    setSelectedMuscles([]);
    setSelectedEquipment([]);
    setSelectedDifficulties([]);
    setSelectedMovements([]);
    setActiveClassification('ALL');
    setSearchInput('');
  };

  const handleSelectBodyPart = (partId: string) => {
    setActiveClassification(partId);
    setIsBurgerMenuOpen(false);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '440px', margin: '0 auto', paddingBottom: '95px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header Bar matching Home / Insights aesthetic with Burger Menu trigger */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.6px' }}>
            {mode === 'PICKER' ? 'WORKOUT BUILDER' : mode === 'REPLACE' ? 'EXERCISE SWAP' : 'WORKOUT CATALOG'}
          </div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', marginTop: '2px', margin: 0 }}>
            {mode === 'REPLACE' ? `Replace ${replacingExerciseName || 'Exercise'}` : 'Exercise Library'}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Movement Counter Pill */}
          <span style={{
            fontSize: '11px',
            color: '#06b6d4',
            backgroundColor: '#111b2b',
            border: '1px solid #1e2d44',
            padding: '5px 10px',
            borderRadius: '12px',
            fontWeight: '800',
            letterSpacing: '0.3px'
          }}>
            {totalMovements} Movements
          </span>

          {/* Burger Menu Button */}
          <button
            type="button"
            onClick={() => setIsBurgerMenuOpen(true)}
            aria-label="Open Body Parts Menu"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              backgroundColor: isBurgerMenuOpen ? '#06b6d4' : '#111b2b',
              border: isBurgerMenuOpen ? '1px solid #06b6d4' : '1px solid #1e2d44',
              color: isBurgerMenuOpen ? '#0c1324' : '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: isBurgerMenuOpen ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Search Bar with Filter Trigger */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#111b2b',
          border: '1px solid #1e2d44',
          borderRadius: '14px',
          padding: '0 14px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search exercises, aliases, muscles..."
            aria-label="Search exercises"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '13px',
              padding: '12px 0',
              outline: 'none',
              fontWeight: '500'
            }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px', padding: 0 }}
              aria-label="Clear search input"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsFilterSheetOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: totalActiveFilters > 0 ? '#06b6d4' : '#111b2b',
            color: totalActiveFilters > 0 ? '#0c1324' : '#ffffff',
            border: totalActiveFilters > 0 ? '1px solid #06b6d4' : '1px solid #1e2d44',
            borderRadius: '14px',
            padding: '0 14px',
            fontSize: '12px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: totalActiveFilters > 0 ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
            transition: 'all 0.15s ease'
          }}
          aria-label="Open filter options"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
          <span>Filters</span>
          {totalActiveFilters > 0 && (
            <span style={{
              backgroundColor: '#0c1324',
              color: '#06b6d4',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* 3. Horizontal Classification Bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
        {CLASSIFICATION_TABS.map((tab) => {
          const isActive = activeClassification === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveClassification(tab.id)}
              style={{
                padding: '7px 15px',
                borderRadius: '16px',
                border: isActive ? '1px solid #06b6d4' : '1px solid #1e2d44',
                backgroundColor: isActive ? '#06b6d4' : '#111b2b',
                color: isActive ? '#0c1324' : '#94a3b8',
                fontWeight: '800',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Removable Active Filter Chips */}
      {totalActiveFilters > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px', alignItems: 'center' }}>
          {selectedMuscles.map((m) => (
            <span key={m} style={{
              backgroundColor: '#111b2b',
              border: '1px solid #06b6d4',
              borderRadius: '14px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#22d3ee',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {m}
              <button
                type="button"
                onClick={() => setSelectedMuscles(selectedMuscles.filter((x) => x !== m))}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                ✕
              </button>
            </span>
          ))}

          {selectedEquipment.map((eq) => (
            <span key={eq} style={{
              backgroundColor: '#111b2b',
              border: '1px solid #bef264',
              borderRadius: '14px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#bef264',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {eq}
              <button
                type="button"
                onClick={() => setSelectedEquipment(selectedEquipment.filter((x) => x !== eq))}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                ✕
              </button>
            </span>
          ))}

          {selectedDifficulties.map((d) => (
            <span key={d} style={{
              backgroundColor: '#111b2b',
              border: '1px solid #f59e0b',
              borderRadius: '14px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#f59e0b',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              {d}
              <button
                type="button"
                onClick={() => setSelectedDifficulties(selectedDifficulties.filter((x) => x !== d))}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
              >
                ✕
              </button>
            </span>
          ))}

          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              background: 'none',
              border: 'none',
              color: '#ef4444',
              fontSize: '11px',
              fontWeight: '800',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={{
              height: '92px',
              backgroundColor: '#111b2b',
              borderRadius: '18px',
              border: '1px solid #1e2d44',
              animation: 'pulse 1.5s infinite ease-in-out'
            }} />
          ))}
        </div>
      )}

      {/* Error / Offline State */}
      {!loading && error && (
        <div style={{
          padding: '30px 20px',
          textAlign: 'center',
          backgroundColor: '#1c131d',
          border: '1px solid #3b1828',
          borderRadius: '18px',
          margin: '20px 0'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#f87171', margin: '8px 0 4px 0' }}>Couldn't load exercises</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>{error}</p>
          <button
            type="button"
            onClick={loadData}
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '8px 18px',
              fontWeight: '800',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty Search / Filter State */}
      {!loading && !error && exercises.length === 0 && (
        <div style={{
          padding: '36px 20px',
          textAlign: 'center',
          backgroundColor: '#111b2b',
          border: '1px dashed #1e2d44',
          borderRadius: '18px',
          margin: '10px 0'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: '10px 0 6px 0' }}>No movements matched</h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', lineHeight: '1.5' }}>
            Try checking spelling, removing active filters, or searching broad terms like <em>"Chest"</em> or <em>"Squat"</em>.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              backgroundColor: '#06b6d4',
              color: '#0c1324',
              border: 'none',
              borderRadius: '12px',
              padding: '10px 20px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)'
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* 4. Exercise Cards List */}
      {!loading && !error && exercises.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercises.map((exercise) => {
            const thumb = (exercise.media?.thumbnail && exercise.media.thumbnail.startsWith('http'))
              ? exercise.media.thumbnail
              : 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80';

            return (
              <div
                key={exercise._id || exercise.slug}
                onClick={() => {
                  if (mode === 'REPLACE' && onReplaceExerciseInWorkout) {
                    onReplaceExerciseInWorkout(exercise);
                  } else {
                    onSelectExercise(exercise.slug || exercise._id);
                  }
                }}
                style={{
                  backgroundColor: '#111b2b',
                  border: '1px solid #1e2d44',
                  borderRadius: '18px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                {/* Thumbnail with sleek border */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#0b121f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1.5px solid #1e2d44'
                }}>
                  <img
                    src={thumb}
                    alt={exercise.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '800',
                    color: '#ffffff',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    letterSpacing: '-0.2px'
                  }}>
                    {exercise.name}
                  </h3>

                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '3px 0 6px 0', fontWeight: '500' }}>
                    <strong style={{ color: '#22d3ee', fontWeight: '800' }}>{exercise.primaryMuscles?.[0] || 'CHEST'}</strong> • {exercise.movementPattern?.replace('_', ' ') || 'COMPOUND'}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: '#162236',
                      border: '1px solid #24324a',
                      color: '#93c5fd',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: '700'
                    }}>
                      {exercise.equipment?.[0] || 'BARBELL'}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: '#1c2417',
                      border: '1px solid #2f4023',
                      color: '#bef264',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: '800'
                    }}>
                      {exercise.difficulty || 'INTERMEDIATE'}
                    </span>
                  </div>
                </div>

                {/* Card Action: Start / Do Exercise Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onStartExerciseWorkout) {
                        onStartExerciseWorkout(exercise);
                      } else {
                        onSelectExercise(exercise.slug || exercise._id);
                      }
                    }}
                    style={{
                      backgroundColor: '#bef264',
                      color: '#0c1324',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '7px 14px',
                      fontSize: '12px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 10px rgba(190, 242, 100, 0.3)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span>Do It</span>
                  </button>

                  {mode === 'PICKER' && (
                    <button
                      type="button"
                      onClick={(e) => handleOpenConfig(e, exercise)}
                      style={{
                        backgroundColor: '#06b6d4',
                        color: '#0c1324',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontWeight: '800',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      + Add
                    </button>
                  )}

                  {mode === 'REPLACE' && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onReplaceExerciseInWorkout) onReplaceExerciseInWorkout(exercise);
                      }}
                      style={{
                        backgroundColor: '#22d3ee',
                        color: '#0c1324',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontWeight: '800',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Swap
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. BURGER MENU SLIDE-OUT DRAWER FOR BODY PARTS */}
      {isBurgerMenuOpen && (
        <div
          onClick={() => setIsBurgerMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0b121f',
              width: '85%',
              maxWidth: '340px',
              height: '100%',
              borderRight: '1px solid #1e2d44',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              overflowY: 'auto',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.7)'
            }}
          >
            {/* Burger Menu Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e2d44', paddingBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.6px' }}>
                  ANATOMY FILTER
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '2px 0 0 0' }}>
                  Target Body Parts
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsBurgerMenuOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#111b2b',
                  border: '1px solid #1e2d44',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Body Parts List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {BODY_PARTS_BURGER_MENU.map((item) => {
                const isSelected = activeClassification === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectBodyPart(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      backgroundColor: isSelected ? '#111b2b' : 'transparent',
                      border: isSelected ? '1.5px solid #06b6d4' : '1px solid transparent',
                      color: isSelected ? '#ffffff' : '#94a3b8',
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 0 16px rgba(6, 182, 212, 0.25)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: isSelected ? '#06b6d4' : '#111b2b',
                      border: '1px solid #1e2d44',
                      color: isSelected ? '#0c1324' : '#22d3ee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: isSelected ? '#00f2fe' : '#ffffff' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.sub}
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#06b6d4', boxShadow: '0 0 8px #06b6d4' }}></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Reset Footer Button */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #1e2d44' }}>
              <button
                type="button"
                onClick={() => handleSelectBodyPart('ALL')}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '14px',
                  backgroundColor: '#111b2b',
                  border: '1px solid #1e2d44',
                  color: '#22d3ee',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>View All 317 Exercises</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. FILTER BOTTOM SHEET MODAL */}
      {isFilterSheetOpen && (
        <div
          onClick={() => setIsFilterSheetOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0b121f',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              width: '100%',
              maxWidth: '440px',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '24px 20px',
              borderTop: '1px solid #1e2d44',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            {/* Sheet Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.6px' }}>
                  FILTER BY ATTRIBUTES
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFilterSheetOpen(false)}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#111b2b',
                  border: '1px solid #1e2d44',
                  color: '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Muscle Group Checkboxes */}
            <div>
              <h4 style={{ fontSize: '12px', color: '#22d3ee', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>
                Primary Muscle
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {MUSCLE_OPTIONS.map((muscle) => {
                  const isSelected = selectedMuscles.includes(muscle);
                  return (
                    <button
                      key={muscle}
                      type="button"
                      onClick={() => {
                        setSelectedMuscles(
                          isSelected ? selectedMuscles.filter((m) => m !== muscle) : [...selectedMuscles, muscle]
                        );
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        border: isSelected ? '1px solid #06b6d4' : '1px solid #1e2d44',
                        backgroundColor: isSelected ? '#111b2b' : '#0b121f',
                        color: isSelected ? '#00f2fe' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 0 10px rgba(6, 182, 212, 0.3)' : 'none'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{muscle}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Equipment Options */}
            <div>
              <h4 style={{ fontSize: '12px', color: '#bef264', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>
                Equipment
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {EQUIPMENT_OPTIONS.map((eq) => {
                  const isSelected = selectedEquipment.includes(eq);
                  return (
                    <button
                      key={eq}
                      type="button"
                      onClick={() => {
                        setSelectedEquipment(
                          isSelected ? selectedEquipment.filter((x) => x !== eq) : [...selectedEquipment, eq]
                        );
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        border: isSelected ? '1px solid #bef264' : '1px solid #1e2d44',
                        backgroundColor: isSelected ? '#111b2b' : '#0b121f',
                        color: isSelected ? '#bef264' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        cursor: 'pointer',
                        boxShadow: isSelected ? '0 0 10px rgba(190, 242, 100, 0.3)' : 'none'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{eq}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <h4 style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>
                Difficulty Level
              </h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                {DIFFICULTY_OPTIONS.map((d) => {
                  const isSelected = selectedDifficulties.includes(d);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => {
                        setSelectedDifficulties(
                          isSelected ? selectedDifficulties.filter((x) => x !== d) : [...selectedDifficulties, d]
                        );
                      }}
                      style={{
                        flex: 1,
                        padding: '8px 0',
                        borderRadius: '12px',
                        fontSize: '11px',
                        border: isSelected ? '1px solid #f59e0b' : '1px solid #1e2d44',
                        backgroundColor: isSelected ? '#111b2b' : '#0b121f',
                        color: isSelected ? '#f59e0b' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Movement Patterns */}
            <div>
              <h4 style={{ fontSize: '12px', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '800', letterSpacing: '0.5px' }}>
                Movement Pattern
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {MOVEMENT_OPTIONS.map((p) => {
                  const isSelected = selectedMovements.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setSelectedMovements(
                          isSelected ? selectedMovements.filter((x) => x !== p) : [...selectedMovements, p]
                        );
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        border: isSelected ? '1px solid #38bdf8' : '1px solid #1e2d44',
                        backgroundColor: isSelected ? '#111b2b' : '#0b121f',
                        color: isSelected ? '#38bdf8' : '#94a3b8',
                        fontWeight: isSelected ? '800' : '600',
                        cursor: 'pointer'
                      }}
                    >
                      {isSelected ? '✓ ' : ''}{p.replace('_', ' ')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sheet Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={clearAllFilters}
                style={{
                  flex: 1,
                  padding: '14px',
                  borderRadius: '14px',
                  border: '1px solid #1e2d44',
                  backgroundColor: '#111b2b',
                  color: '#ffffff',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setIsFilterSheetOpen(false)}
                style={{
                  flex: 2,
                  padding: '14px',
                  borderRadius: '14px',
                  border: 'none',
                  backgroundColor: '#06b6d4',
                  color: '#0c1324',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 0 16px rgba(6, 182, 212, 0.4)'
                }}
              >
                Apply Filters ({totalActiveFilters})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. QUICK CONFIGURATION MODAL (FOR ADD TO WORKOUT) */}
      {configExercise && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(6px)',
          zIndex: 1100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#0b121f',
            borderRadius: '22px',
            width: '100%',
            maxWidth: '380px',
            padding: '24px',
            border: '1px solid #1e2d44',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '10px', color: '#06b6d4', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                CONFIGURE EXERCISE
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '4px 0 0 0' }}>{configExercise.name}</h3>
            </div>

            {/* Sets control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700' }}>Target Sets</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setConfigSets(Math.max(1, configSets - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#111b2b', color: '#ffffff', border: '1px solid #1e2d44', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#bef264', width: '24px', textAlign: 'center' }}>{configSets}</span>
                <button
                  type="button"
                  onClick={() => setConfigSets(configSets + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#111b2b', color: '#ffffff', border: '1px solid #1e2d44', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Reps control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700' }}>Target Reps</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setConfigReps(Math.max(1, configReps - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#111b2b', color: '#ffffff', border: '1px solid #1e2d44', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#bef264', width: '24px', textAlign: 'center' }}>{configReps}</span>
                <button
                  type="button"
                  onClick={() => setConfigReps(configReps + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#111b2b', color: '#ffffff', border: '1px solid #1e2d44', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Rest Control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '700' }}>Rest Interval</span>
              <select
                value={configRest}
                onChange={(e) => setConfigRest(Number(e.target.value))}
                style={{
                  backgroundColor: '#111b2b',
                  color: '#ffffff',
                  border: '1px solid #1e2d44',
                  borderRadius: '10px',
                  padding: '6px 10px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                <option value={60}>60s</option>
                <option value={90}>90s</option>
                <option value={120}>120s (2m)</option>
                <option value={180}>180s (3m)</option>
              </select>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => setConfigExercise(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #1e2d44',
                  backgroundColor: '#111b2b',
                  color: '#ffffff',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAdd}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#06b6d4',
                  color: '#0c1324',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)'
                }}
              >
                Add to Workout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
