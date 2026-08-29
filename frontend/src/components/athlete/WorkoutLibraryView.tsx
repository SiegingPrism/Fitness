import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  fetchExercises,
  fetchPopularExercises,
  fetchFavoriteExercises,
  fetchRecentExercises,
  toggleFavoriteExerciseApi,
  type ExerciseFilter
} from '../../services/api';

interface Props {
  onSelectExercise: (exerciseId: string) => void;
  mode?: 'BROWSE' | 'PICKER' | 'REPLACE';
  replacingExerciseName?: string;
  onAddExerciseToWorkout?: (exercise: any, config: { sets: number; reps: number; rest: number; rpe: number }) => void;
  onReplaceExerciseInWorkout?: (newExercise: any) => void;
}

const MUSCLE_OPTIONS = ['CHEST', 'LATS', 'UPPER_BACK', 'LOWER_BACK', 'FRONT_DELTS', 'SIDE_DELTS', 'REAR_DELTS', 'BICEPS', 'TRICEPS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'ABS'];
const EQUIPMENT_OPTIONS = ['BARBELL', 'DUMBBELL', 'CABLE', 'MACHINE', 'BODYWEIGHT', 'BENCH', 'PULL_UP_BAR'];
const DIFFICULTY_OPTIONS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
const MOVEMENT_OPTIONS = ['HORIZONTAL_PUSH', 'VERTICAL_PUSH', 'HORIZONTAL_PULL', 'VERTICAL_PULL', 'SQUAT', 'HINGE', 'LUNGE'];

export const WorkoutLibraryView: React.FC<Props> = ({
  onSelectExercise,
  mode = 'BROWSE',
  replacingExerciseName,
  onAddExerciseToWorkout,
  onReplaceExerciseInWorkout
}) => {
  const [exercises, setExercises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMovements, setTotalMovements] = useState(0);

  // Tab: 'all' | 'popular' | 'recent' | 'favorites'
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'recent' | 'favorites'>('all');

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

  // Favorites Set (for instant heart toggling)
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set(['ex_1', 'ex_11', 'ex_21']));

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
      if (activeTab === 'popular') {
        const res = await fetchPopularExercises();
        if (currentSeq === requestSeq.current) {
          setExercises(res.data || []);
          setTotalMovements(res.data?.length || 0);
        }
      } else if (activeTab === 'favorites') {
        const res = await fetchFavoriteExercises();
        if (currentSeq === requestSeq.current) {
          setExercises(res.data || []);
          setTotalMovements(res.data?.length || 0);
        }
      } else if (activeTab === 'recent') {
        const res = await fetchRecentExercises();
        if (currentSeq === requestSeq.current) {
          setExercises(res.data || []);
          setTotalMovements(res.data?.length || 0);
        }
      } else {
        const filter: ExerciseFilter = {
          search: debouncedSearch.trim() || undefined,
          muscles: selectedMuscles.length > 0 ? selectedMuscles : undefined,
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
  }, [activeTab, debouncedSearch, selectedMuscles, selectedEquipment, selectedDifficulties, selectedMovements]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleFavorite = async (e: React.MouseEvent, exerciseId: string) => {
    e.stopPropagation();
    const nextFavorites = new Set(favoriteIds);
    if (nextFavorites.has(exerciseId)) {
      nextFavorites.delete(exerciseId);
    } else {
      nextFavorites.add(exerciseId);
    }
    setFavoriteIds(nextFavorites);
    await toggleFavoriteExerciseApi(exerciseId);
  };

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
    setSearchInput('');
  };

  return (
    <div style={{ padding: '16px', maxWidth: '480px', margin: '0 auto', paddingBottom: '90px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header & Mode Notice */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '800', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {mode === 'PICKER' ? '⚡ WORKOUT BUILDER' : mode === 'REPLACE' ? '🔁 EXERCISE REPLACEMENT' : 'PHASE 6A.3 • DISCOVERY'}
          </span>
          <h1 className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff', margin: '2px 0 0 0' }}>
            {mode === 'REPLACE' ? `Replace ${replacingExerciseName || 'Exercise'}` : 'Exercise Library'}
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '12px',
            color: '#bef264',
            backgroundColor: '#1c2817',
            border: '1px solid #364d26',
            padding: '4px 10px',
            borderRadius: '16px',
            fontWeight: '700'
          }}>
            {totalMovements} Movements
          </span>
        </div>
      </div>

      {/* Search Input Bar with Filter Sheet Trigger */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#151b2d',
          border: '1px solid #2e3447',
          borderRadius: '12px',
          padding: '0 12px'
        }}>
          <span style={{ fontSize: '16px', color: '#8d9882', marginRight: '8px' }}>🔍</span>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search exercises, aliases, muscles (e.g. 'RDL', 'Bench')..."
            aria-label="Search exercises"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '13px',
              padding: '12px 0',
              outline: 'none'
            }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput('')}
              style={{ background: 'none', border: 'none', color: '#8d9882', cursor: 'pointer', fontSize: '14px' }}
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
            backgroundColor: totalActiveFilters > 0 ? '#bef264' : '#151b2d',
            color: totalActiveFilters > 0 ? '#0d150b' : '#ffffff',
            border: '1px solid #2e3447',
            borderRadius: '12px',
            padding: '0 14px',
            fontSize: '13px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
          aria-label="Open filter options"
        >
          <span>⚙️</span>
          <span>Filters</span>
          {totalActiveFilters > 0 && (
            <span style={{
              backgroundColor: '#0d150b',
              color: '#bef264',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px'
            }}>
              {totalActiveFilters}
            </span>
          )}
        </button>
      </div>

      {/* Discovery Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: 'All Catalog' },
          { id: 'popular', label: '🔥 Popular' },
          { id: 'recent', label: '⏱️ Recent' },
          { id: 'favorites', label: '❤️ Favorites' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '7px 14px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: isActive ? '#bef264' : '#151b2d',
                color: isActive ? '#0d150b' : '#8d9882',
                fontWeight: isActive ? '800' : '600',
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
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
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#38bdf8',
              fontWeight: '600',
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
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#bef264',
              fontWeight: '600',
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
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '16px',
              padding: '4px 10px',
              fontSize: '11px',
              color: '#f59e0b',
              fontWeight: '600',
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
              fontWeight: '700',
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
              backgroundColor: '#151b2d',
              borderRadius: '14px',
              border: '1px solid #2e3447',
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
          backgroundColor: '#1e1414',
          border: '1px solid #4a1d1d',
          borderRadius: '16px',
          margin: '20px 0'
        }}>
          <span style={{ fontSize: '32px' }}>⚠️</span>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffb4ab', margin: '8px 0 4px 0' }}>Couldn't load exercises</h3>
          <p style={{ fontSize: '13px', color: '#8d9882', marginBottom: '16px' }}>{error}</p>
          <button
            type="button"
            onClick={loadData}
            style={{
              backgroundColor: '#ffb4ab',
              color: '#690005',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Empty Search / Filter State */}
      {!loading && !error && exercises.length === 0 && (
        <div style={{
          padding: '36px 20px',
          textAlign: 'center',
          backgroundColor: '#131926',
          border: '1px dashed #2e3447',
          borderRadius: '16px',
          margin: '10px 0'
        }}>
          <span style={{ fontSize: '36px' }}>🔎</span>
          <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff', margin: '10px 0 6px 0' }}>No movements matched</h3>
          <p style={{ fontSize: '13px', color: '#8d9882', marginBottom: '16px', lineHeight: '1.5' }}>
            Try checking spelling, removing active filters, or searching broad terms like <em>"Chest"</em> or <em>"Squat"</em>.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              backgroundColor: '#bef264',
              color: '#0d150b',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Exercise Cards List */}
      {!loading && !error && exercises.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exercises.map((exercise) => {
            const isFav = favoriteIds.has(exercise._id) || favoriteIds.has(exercise.slug);
            const thumb = exercise.media?.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80';

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
                  backgroundColor: '#151b2d',
                  border: '1px solid #2e3447',
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  backgroundColor: '#0a0e1a'
                }}>
                  <img
                    src={thumb}
                    alt={exercise.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {exercise.name}
                    </h3>
                  </div>

                  <p style={{ fontSize: '12px', color: '#8d9882', margin: '3px 0 6px 0' }}>
                    <strong style={{ color: '#bef264' }}>{exercise.primaryMuscles?.[0] || 'CHEST'}</strong> • {exercise.movementPattern?.replace('_', ' ') || 'COMPOUND'}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: '#1f293d',
                      color: '#93c5fd',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: '600'
                    }}>
                      {exercise.equipment?.[0] || 'BARBELL'}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      backgroundColor: '#262115',
                      color: '#fde047',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      fontWeight: '700'
                    }}>
                      {exercise.difficulty || 'INTERMEDIATE'}
                    </span>
                  </div>
                </div>

                {/* Card Actions: Favorite Heart & Context Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={(e) => handleToggleFavorite(e, exercise._id || exercise.slug)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>

                  {mode === 'PICKER' && (
                    <button
                      type="button"
                      onClick={(e) => handleOpenConfig(e, exercise)}
                      style={{
                        backgroundColor: '#bef264',
                        color: '#0d150b',
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
                        backgroundColor: '#38bdf8',
                        color: '#082f49',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 10px',
                        fontWeight: '800',
                        fontSize: '11px',
                        cursor: 'pointer'
                      }}
                    >
                      Swap 🔁
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FILTER BOTTOM SHEET MODAL */}
      {isFilterSheetOpen && (
        <div
          onClick={() => setIsFilterSheetOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#111726',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              width: '100%',
              maxWidth: '480px',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '24px 20px',
              borderTop: '1px solid #2e3447',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px'
            }}
          >
            {/* Sheet Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: 0 }}>Filters</h2>
              <button
                type="button"
                onClick={() => setIsFilterSheetOpen(false)}
                style={{ background: 'none', border: 'none', color: '#8d9882', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Muscle Group Checkboxes */}
            <div>
              <h4 style={{ fontSize: '13px', color: '#bef264', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700' }}>
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
                        fontSize: '12px',
                        border: isSelected ? '1px solid #bef264' : '1px solid #2e3447',
                        backgroundColor: isSelected ? '#1c2817' : '#151b2d',
                        color: isSelected ? '#bef264' : '#ffffff',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer'
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
              <h4 style={{ fontSize: '13px', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700' }}>
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
                        fontSize: '12px',
                        border: isSelected ? '1px solid #38bdf8' : '1px solid #2e3447',
                        backgroundColor: isSelected ? '#082f49' : '#151b2d',
                        color: isSelected ? '#38bdf8' : '#ffffff',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: 'pointer'
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
              <h4 style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700' }}>
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
                        fontSize: '12px',
                        border: isSelected ? '1px solid #f59e0b' : '1px solid #2e3447',
                        backgroundColor: isSelected ? '#451a03' : '#151b2d',
                        color: isSelected ? '#f59e0b' : '#ffffff',
                        fontWeight: isSelected ? '700' : '500',
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
              <h4 style={{ fontSize: '13px', color: '#a855f7', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '700' }}>
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
                        fontSize: '12px',
                        border: isSelected ? '1px solid #a855f7' : '1px solid #2e3447',
                        backgroundColor: isSelected ? '#3b0764' : '#151b2d',
                        color: isSelected ? '#a855f7' : '#ffffff',
                        fontWeight: isSelected ? '700' : '500',
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
                  borderRadius: '12px',
                  border: '1px solid #2e3447',
                  backgroundColor: '#151b2d',
                  color: '#ffffff',
                  fontWeight: '700',
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
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: '#bef264',
                  color: '#0d150b',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Apply Filters ({totalActiveFilters})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK CONFIGURATION MODAL (FOR ADD TO WORKOUT) */}
      {configExercise && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#111726',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '380px',
            padding: '24px',
            border: '1px solid #2e3447',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div>
              <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '800', textTransform: 'uppercase' }}>CONFIGURE EXERCISE</span>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '4px 0 0 0' }}>{configExercise.name}</h3>
            </div>

            {/* Sets control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>Target Sets</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setConfigSets(Math.max(1, configSets - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#bef264', width: '24px', textAlign: 'center' }}>{configSets}</span>
                <button
                  type="button"
                  onClick={() => setConfigSets(configSets + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Reps control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>Target Reps</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setConfigReps(Math.max(1, configReps - 1))}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#bef264', width: '24px', textAlign: 'center' }}>{configReps}</span>
                <button
                  type="button"
                  onClick={() => setConfigReps(configReps + 1)}
                  style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#1e293b', color: '#ffffff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Rest Control */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '600' }}>Rest Interval</span>
              <select
                value={configRest}
                onChange={(e) => setConfigRest(Number(e.target.value))}
                style={{
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  fontSize: '13px',
                  fontWeight: '600'
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
                  borderRadius: '10px',
                  border: '1px solid #2e3447',
                  backgroundColor: '#151b2d',
                  color: '#ffffff',
                  fontWeight: '700',
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
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#bef264',
                  color: '#0d150b',
                  fontWeight: '800',
                  cursor: 'pointer'
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
