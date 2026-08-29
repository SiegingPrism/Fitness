import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export const WaterTrackerView: React.FC<Props> = ({ onBack }) => {
  const [waterLiters, setWaterLiters] = useState(1.75);
  const targetLiters = 3.0;

  const addWater = (amountMl: number) => {
    setWaterLiters((prev) => Math.min(targetLiters, Number((prev + amountMl / 1000).toFixed(2))));
  };

  const percentage = Math.round((waterLiters / targetLiters) * 100);

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            type="button"
            onClick={onBack}
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#111b2b', border: '1px solid #1e2d44', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div>
            <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.6px' }}>HYDRATION TRACKER</div>
            <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Log Water</h1>
          </div>
        </div>
      </div>

      {/* 2. Circular Progress Gauge */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', margin: '10px 0' }}>
        <div style={{ position: 'relative', width: '210px', height: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="210" height="210" viewBox="0 0 210 210" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="105" cy="105" r="88" stroke="#0b121f" strokeWidth="14" fill="none" />
            <circle
              cx="105"
              cy="105"
              r="88"
              stroke="#06b6d4"
              strokeWidth="14"
              strokeDasharray="553"
              strokeDashoffset={553 - (553 * (waterLiters / targetLiters))}
              strokeLinecap="round"
              fill="none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.6))', transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '4px' }}>
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <div className="font-headline" style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff' }}>{waterLiters}L</div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GOAL: {targetLiters}L</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>
            {percentage >= 100 ? "Goal Completed!" : `${percentage}% of Daily Goal Reached`}
          </div>
          <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', margin: 0 }}>Optimal hydration boosts recovery & muscle growth.</p>
        </div>
      </div>

      {/* 3. Quick Increment Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <button
          type="button"
          onClick={() => addWater(250)}
          style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#0b121f', border: '1px solid #1e2d44', color: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
              <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
              <line x1="6" y1="2" x2="6" y2="4"></line>
              <line x1="10" y1="2" x2="10" y2="4"></line>
              <line x1="14" y1="2" x2="14" y2="4"></line>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>250ml</span>
        </button>

        <button
          type="button"
          onClick={() => addWater(500)}
          style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#0b121f', border: '1px solid #1e2d44', color: '#22d3ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>500ml</span>
        </button>

        <button
          type="button"
          onClick={() => addWater(1000)}
          style={{ backgroundColor: '#111b2b', border: '1.5px solid #06b6d4', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', boxShadow: '0 0 14px rgba(6, 182, 212, 0.25)' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#06b6d4', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
          </div>
          <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>1L Bottle</span>
        </button>
      </div>

      {/* 4. Weekly History Chart */}
      <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '22px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>Weekly History</h3>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Past 7 Days Consistency</div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#06b6d4' }}>Avg: 2.6L/day</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '100px', paddingTop: '10px' }}>
          {[
            { day: 'Mon', liters: 2.8, target: 3.0 },
            { day: 'Tue', liters: 3.0, target: 3.0 },
            { day: 'Wed', liters: 2.5, target: 3.0 },
            { day: 'Thu', liters: 3.2, target: 3.0 },
            { day: 'Fri', liters: 2.7, target: 3.0 },
            { day: 'Sat', liters: 3.0, target: 3.0 },
            { day: 'Sun', liters: 1.75, target: 3.0, current: true }
          ].map((item, idx) => {
            const h = Math.min(100, Math.round((item.liters / item.target) * 100));
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <div style={{ width: '16px', height: '70px', backgroundColor: '#0b121f', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${h}%`, backgroundColor: item.current ? '#06b6d4' : '#22d3ee', borderRadius: '8px', boxShadow: item.current ? '0 0 8px #06b6d4' : 'none' }}></div>
                </div>
                <span style={{ fontSize: '10px', color: item.current ? '#00f2fe' : '#64748b', fontWeight: item.current ? '800' : '600' }}>{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
