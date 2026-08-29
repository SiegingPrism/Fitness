import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onConfirmLog?: () => void;
}

export const LogMealView: React.FC<Props> = ({ onBack, onConfirmLog }) => {
  const [loggedItems, setLoggedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const foodItems = {
    frequent: [
      { name: 'Greek Yogurt with Berries', calories: 170, portion: '1 cup (245g)', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=150&q=80' },
      { name: 'Grilled Chicken Breast', calories: 284, portion: '6 oz (170g)', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=150&q=80' }
    ],
    recent: [
      { name: 'Avocado Toast', calories: 240, portion: '1 slice', img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=150&q=80' },
      { name: 'Espresso', calories: 2, portion: '1 shot', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=150&q=80' },
      { name: 'Almonds', calories: 164, portion: '1 oz (28g)', img: 'https://images.unsplash.com/photo-1508061252966-dfd30f67aea5?auto=format&fit=crop&w=150&q=80' }
    ]
  };

  const toggleAddFood = (name: string) => {
    if (loggedItems.includes(name)) {
      setLoggedItems(loggedItems.filter(i => i !== name));
    } else {
      setLoggedItems([...loggedItems, name]);
    }
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
          </button>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Log Meal</h1>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>calendar_today</span>
        </button>
      </div>

      {/* 2. Macronutrients Gauge Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#3cddc7', textTransform: 'uppercase' }}>Protein</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>75g</div>
          <div style={{ height: '4px', backgroundColor: '#23293c', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', backgroundColor: '#3cddc7' }}></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#3cddc7', textTransform: 'uppercase' }}>Carbs</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>120g</div>
          <div style={{ height: '4px', backgroundColor: '#23293c', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: '#3cddc7' }}></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#3cddc7', textTransform: 'uppercase' }}>Fats</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginTop: '4px' }}>45g</div>
          <div style={{ height: '4px', backgroundColor: '#23293c', borderRadius: '2px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '35%', height: '100%', backgroundColor: '#3cddc7' }}></div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <span className="material-symbols-outlined" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8d9882', fontSize: '20px' }}>search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search 1M+ foods..."
          style={{
            width: '100%',
            backgroundColor: '#151b2d',
            border: '1px solid #2e3447',
            borderRadius: '16px',
            padding: '14px 44px',
            color: '#ffffff',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* 4. Action Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '14px', padding: '12px', color: '#ffffff', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '20px' }}>qr_code_scanner</span>
          <span>Barcode Scanner</span>
        </button>
        <button style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '14px', padding: '12px', color: '#ffffff', fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '20px' }}>add_circle</span>
          <span>Custom Food</span>
        </button>
      </div>

      {/* 5. Frequent Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Frequent</h2>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#bef264', cursor: 'pointer' }}>See all</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {foodItems.frequent.map((item, idx) => {
            const isSelected = loggedItems.includes(item.name);
            return (
              <div key={idx} style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px' }}>{item.calories} kcal • {item.portion}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleAddFood(item.name)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#bef264' : '#191f31',
                    color: isSelected ? '#0c1324' : '#bef264',
                    border: '1px solid #2e3447',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>{isSelected ? 'check' : 'add'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Recent Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Recent</h2>
          <span onClick={() => setLoggedItems([])} style={{ fontSize: '12px', fontWeight: 'bold', color: '#bef264', cursor: 'pointer' }}>Clear</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {foodItems.recent.map((item, idx) => {
            const isSelected = loggedItems.includes(item.name);
            return (
              <div key={idx} style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '16px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px' }}>{item.calories} kcal • {item.portion}</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleAddFood(item.name)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#bef264' : '#191f31',
                    color: isSelected ? '#0c1324' : '#bef264',
                    border: '1px solid #2e3447',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>{isSelected ? 'check' : 'add'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Confirm Log Button */}
      <button
        onClick={() => {
          if (onConfirmLog) onConfirmLog();
          onBack();
        }}
        className="font-headline"
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#bef264',
          color: '#0c1324',
          border: 'none',
          borderRadius: '16px',
          fontSize: '15px',
          fontWeight: '900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(190, 242, 100, 0.4)'
        }}
      >
        <span>Confirm Log</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>check_circle</span>
      </button>
    </div>
  );
};
