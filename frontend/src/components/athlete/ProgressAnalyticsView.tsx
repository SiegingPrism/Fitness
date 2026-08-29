import React, { useState, useEffect } from 'react';
import { fetchAnalyticsProgress } from '../../services/api';

export const ProgressAnalyticsView: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState('Barbell Bench Press');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7D' | '30D' | '3M' | '1Y'>('30D');
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [activePointIndex, setActivePointIndex] = useState<number | null>(4);

  const EXERCISE_OPTIONS = [
    { id: 'Barbell Bench Press', label: 'Bench Press' },
    { id: 'Barbell Squat', label: 'Squat' },
    { id: 'Deadlift', label: 'Deadlift' },
    { id: 'Overhead Press', label: 'OHP' },
    { id: 'Barbell Row', label: 'Barbell Row' },
    { id: 'Incline Dumbbell Press', label: 'Incline Press' }
  ];

  const TIMEFRAMES: ('7D' | '30D' | '3M' | '1Y')[] = ['7D', '30D', '3M', '1Y'];

  useEffect(() => {
    let isMounted = true;
    const loadAnalytics = async () => {
      const res = await fetchAnalyticsProgress(selectedExercise, selectedTimeframe);
      if (isMounted) {
        if (res?.data) {
          setAnalyticsData(res.data);
          setActivePointIndex((res.data.trendPoints?.length || 1) - 1);
        }
      }
    };
    loadAnalytics();
    return () => {
      isMounted = false;
    };
  }, [selectedExercise, selectedTimeframe]);

  // Fallback defaults if loading or offline
  const defaultCurrent1RM = selectedExercise.includes('Squat') ? 163 : selectedExercise.includes('Deadlift') ? 198 : selectedExercise.includes('Overhead') ? 78 : 116;
  const current1RM = analyticsData?.current1RM || defaultCurrent1RM;
  const percentIncrease = analyticsData?.percentIncrease || 12.4;
  const totalVolumeKg = analyticsData?.monthlyVolumeKg || 42850;
  const totalWorkouts = analyticsData?.totalWorkouts || 18;
  const activeStreak = analyticsData?.activeStreakDays || 15;
  const trendPoints = analyticsData?.trendPoints || [
    { point: 'W1', val: Math.round(current1RM * 0.86), est1RM: Math.round(current1RM * 0.86), date: '4 weeks ago' },
    { point: 'W2', val: Math.round(current1RM * 0.90), est1RM: Math.round(current1RM * 0.90), date: '3 weeks ago' },
    { point: 'W3', val: Math.round(current1RM * 0.93), est1RM: Math.round(current1RM * 0.93), date: '2 weeks ago' },
    { point: 'W4', val: Math.round(current1RM * 0.97), est1RM: Math.round(current1RM * 0.97), date: 'Last week' },
    { point: 'W5', val: current1RM, est1RM: current1RM, date: 'Current' }
  ];

  const prs = analyticsData?.prs || [
    { exercise: 'Bench Press', topSet: '100 kg × 5 reps', est1RM: '116 kg', date: 'Yesterday' },
    { exercise: 'Back Squat', topSet: '140 kg × 5 reps', est1RM: '163 kg', date: '3 days ago' },
    { exercise: 'Deadlift', topSet: '180 kg × 3 reps', est1RM: '198 kg', date: '5 days ago' },
    { exercise: 'Overhead Press', topSet: '65 kg × 6 reps', est1RM: '78 kg', date: '1 week ago' }
  ];

  const muscleVolumes = analyticsData?.muscleVolumes || [
    { muscle: 'Chest', sets: 22, target: 24, pct: '92%' },
    { muscle: 'Back', sets: 24, target: 24, pct: '100%' },
    { muscle: 'Quads', sets: 18, target: 20, pct: '90%' },
    { muscle: 'Hamstrings', sets: 14, target: 16, pct: '88%' },
    { muscle: 'Shoulders', sets: 16, target: 18, pct: '89%' },
    { muscle: 'Arms', sets: 14, target: 16, pct: '88%' },
    { muscle: 'Core', sets: 12, target: 12, pct: '100%' }
  ];

  const totalWeeklySets = analyticsData?.totalWeeklySets || 120;

  // Compute SVG Curve Coordinates dynamically based on trendPoints
  const minVal = Math.min(...trendPoints.map((p: any) => p.est1RM || p.val || 100)) * 0.92;
  const maxVal = Math.max(...trendPoints.map((p: any) => p.est1RM || p.val || 120)) * 1.06;
  const width = 340;
  const height = 130;
  const paddingX = 24;
  const paddingY = 20;

  const pointsCoordinates = trendPoints.map((pt: any, i: number) => {
    const x = paddingX + (i / (trendPoints.length - 1 || 1)) * (width - paddingX * 2);
    const normalizedY = ((pt.est1RM || pt.val) - minVal) / (maxVal - minVal || 1);
    const y = height - paddingY - normalizedY * (height - paddingY * 2);
    return { x, y, ...pt };
  });

  const pathD = pointsCoordinates.reduce((acc: string, pt: any, idx: number, arr: any[]) => {
    if (idx === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[idx - 1];
    const cp1x = prev.x + (pt.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (pt.x - prev.x) / 2;
    const cp2y = pt.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${pointsCoordinates[pointsCoordinates.length - 1]?.x || width} ${height} L ${pointsCoordinates[0]?.x || 0} ${height} Z`;

  const activePoint = activePointIndex !== null && pointsCoordinates[activePointIndex] ? pointsCoordinates[activePointIndex] : pointsCoordinates[pointsCoordinates.length - 1];

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header Bar matching Home aesthetic */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.6px' }}>
            ATHLETE INSIGHTS
          </div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.3px', marginTop: '2px' }}>
            Performance Analytics
          </h1>
        </div>
        
        {/* Timeframe Filter Pills */}
        <div style={{ display: 'flex', backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '12px', padding: '3px', gap: '2px' }}>
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setSelectedTimeframe(tf)}
              style={{
                backgroundColor: selectedTimeframe === tf ? '#06b6d4' : 'transparent',
                color: selectedTimeframe === tf ? '#0c1324' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '11px',
                fontWeight: '800',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        {/* Monthly Volume */}
        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '14px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.4px' }}>VOLUME</div>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#22d3ee', marginTop: '4px' }}>
            {(totalVolumeKg / 1000).toFixed(1)}k <span style={{ fontSize: '10px', color: '#94a3b8' }}>KG</span>
          </div>
        </div>

        {/* Workouts Completed */}
        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '14px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.4px' }}>SESSIONS</div>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#bef264', marginTop: '4px' }}>
            {totalWorkouts} <span style={{ fontSize: '10px', color: '#94a3b8' }}>LOGGED</span>
          </div>
        </div>

        {/* Day Streak */}
        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '14px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.4px' }}>STREAK</div>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#00f2fe', marginTop: '4px' }}>
            {activeStreak} <span style={{ fontSize: '10px', color: '#94a3b8' }}>DAYS</span>
          </div>
        </div>
      </div>

      {/* 3. Estimated 1RM Progression Curve Card */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.6px' }}>
              STRENGTH PROGRESSION
            </div>
            <div className="font-headline" style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginTop: '2px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span>{activePoint?.est1RM || current1RM} kg</span>
              <span style={{ fontSize: '12px', color: '#bef264', fontWeight: '800' }}>+{percentIncrease}%</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
              {activePoint?.date || 'Current Peak Estimated 1RM'}
            </div>
          </div>

          <span style={{ backgroundColor: '#162236', border: '1px solid #24324a', color: '#06b6d4', fontSize: '11px', fontWeight: '800', padding: '4px 10px', borderRadius: '12px', letterSpacing: '0.4px' }}>
            {selectedTimeframe} TIMEFRAME
          </span>
        </div>

        {/* Exercise Chips Selector */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }} className="no-scrollbar">
          {EXERCISE_OPTIONS.map((ex) => {
            const isActive = selectedExercise === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSelectedExercise(ex.id)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '16px',
                  backgroundColor: isActive ? '#06b6d4' : '#162236',
                  color: isActive ? '#0c1324' : '#94a3b8',
                  fontWeight: '800',
                  fontSize: '12px',
                  border: isActive ? '1px solid #06b6d4' : '1px solid #24324a',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 12px rgba(6, 182, 212, 0.4)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {ex.label}
              </button>
            );
          })}
        </div>

        {/* Smooth Cyan Glowing SVG Curve Graph */}
        <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '6px' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} fill="none">
            <defs>
              <linearGradient id="cyanCurveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Area Fill */}
            <path d={areaD} fill="url(#cyanCurveGrad)" />
            {/* Curve Stroke */}
            <path d={pathD} stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 6px rgba(6, 182, 212, 0.6))' }} />
            {/* Key Data Point Dots */}
            {pointsCoordinates.map((pt: any, idx: number) => {
              const isSelected = activePointIndex === idx;
              return (
                <g key={idx} onClick={() => setActivePointIndex(idx)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? '#00f2fe' : '#0c1324'}
                    stroke={isSelected ? '#ffffff' : '#06b6d4'}
                    strokeWidth={isSelected ? '2.5' : '2'}
                  />
                  {isSelected && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={10}
                      fill="none"
                      stroke="#00f2fe"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 4. Dedicated Personal Records (PRs) Shelf */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>Personal Records (PRs)</h2>
          <span style={{ fontSize: '11px', color: '#bef264', fontWeight: '800', letterSpacing: '0.4px' }}>All-Time Best</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {prs.map((pr: any, idx: number) => (
            <div key={idx} style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{pr.exercise}</div>
              <div className="font-headline" style={{ fontSize: '20px', fontWeight: '900', color: '#bef264', marginTop: '2px' }}>
                {typeof pr.est1RM === 'number' ? `${pr.est1RM} kg` : pr.est1RM}
              </div>
              <div style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600' }}>{pr.topSet}</div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{pr.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Muscle Group Weekly Training Volume */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="font-headline" style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff' }}>Muscle Group Volume</h3>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Weekly Sets vs Target</div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#22d3ee' }}>{totalWeeklySets} Sets Total</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {muscleVolumes.map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#ffffff', fontWeight: '700' }}>{item.muscle}</span>
                <span style={{ color: '#94a3b8', fontWeight: '600' }}>{item.sets} / {item.target} sets</span>
              </div>
              <div style={{ height: '7px', backgroundColor: '#162236', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: item.pct, height: '100%', backgroundColor: idx % 2 === 0 ? '#06b6d4' : '#bef264', borderRadius: '4px', boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
