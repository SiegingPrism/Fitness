import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export const WaterTrackerView: React.FC<Props> = ({ onBack }) => {
  const [waterLiters, setWaterLiters] = useState(1.5);
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
          <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          </button>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Water Tracker</h1>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#3cddc7', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>notifications</span>
        </button>
      </div>

      {/* 2. Circular Progress Gauge */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', margin: '10px 0' }}>
        <div style={{ position: 'relative', width: '210px', height: '210px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="210" height="210" viewBox="0 0 210 210" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="105" cy="105" r="88" stroke="#191f31" strokeWidth="14" fill="none" />
            <circle
              cx="105"
              cy="105"
              r="88"
              stroke="#3cddc7"
              strokeWidth="14"
              strokeDasharray="553"
              strokeDashoffset={553 - (553 * (waterLiters / targetLiters))}
              strokeLinecap="round"
              fill="none"
              style={{ transition: 'stroke-dashoffset 0.8s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#3cddc7', fontSize: '32px', marginBottom: '4px' }}>water_drop</span>
            <div className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>{waterLiters}L</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#8d9882', textTransform: 'uppercase', letterSpacing: '0.5px' }}>GOAL: {targetLiters}L</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>
            {percentage >= 100 ? "Goal Completed! 🎉" : "You're halfway there!"}
          </div>
          <p style={{ fontSize: '13px', color: '#8d9882', marginTop: '4px' }}>Keep it up, your body will thank you.</p>
        </div>
      </div>

      {/* 3. Quick Increment Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <button
          onClick={() => addWater(250)}
          style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#3cddc7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>local_drink</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>250ml</span>
        </button>

        <button
          onClick={() => addWater(500)}
          style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#3cddc7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>local_drink</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>500ml</span>
        </button>

        <button
          onClick={() => addWater(1000)}
          style={{ backgroundColor: '#151b2d', border: '1px solid #3cddc7', borderRadius: '18px', padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#3cddc7', color: '#0c1324', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>water_drop</span>
          </div>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>1L</span>
        </button>
      </div>

      {/* 4. Weekly History Chart */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Weekly History</h2>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#3cddc7', cursor: 'pointer' }}>View Trends</span>
        </div>

        {/* Days Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '80px', paddingTop: '10px' }}>
          {[
            { day: 'MON', active: false },
            { day: 'TUE', active: false },
            { day: 'WED', active: false },
            { day: 'THU', active: false },
            { day: 'FRI', active: true },
            { day: 'SAT', active: false },
            { day: 'SUN', active: false }
          ].map((bar, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: bar.active ? '#3cddc7' : '#8d9882' }}>{bar.day}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #2e3447', paddingTop: '12px', fontSize: '13px' }}>
          <span style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3cddc7' }}></span>
            Average: <strong>2.1L</strong>
          </span>
          <span style={{ color: '#ffffff' }}>Best: <strong>2.8L</strong></span>
        </div>
      </div>

      {/* 5. Pro Tip Card */}
      <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=200&q=80"
          alt="Pro Tip"
          style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }}
        />
        <div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>Pro Tip</div>
          <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px', fontStyle: 'italic' }}>
            "Drink a glass of water immediately post-workout to enhance muscle recovery."
          </div>
        </div>
      </div>
    </div>
  );
};
