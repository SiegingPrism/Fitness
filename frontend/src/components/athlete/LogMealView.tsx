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
      { name: 'Grilled Chicken Breast', calories: 284, portion: '170g (6 oz)', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=150&q=80' }
    ],
    recent: [
      { name: 'Avocado Toast', calories: 240, portion: '1 slice', img: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=150&q=80' },
      { name: 'Espresso', calories: 2, portion: '1 shot', img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=150&q=80' },
      { name: 'Almonds', calories: 164, portion: '28g (1 oz)', img: 'https://images.unsplash.com/photo-1508061252966-dfd30f67aea5?auto=format&fit=crop&w=150&q=80' }
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
            <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.6px' }}>NUTRITION LOG</div>
            <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Log Meal</h1>
          </div>
        </div>
      </div>

      {/* 2. Macronutrients Gauge Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Protein</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>75g</div>
          <div style={{ height: '5px', backgroundColor: '#0b121f', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', backgroundColor: '#06b6d4', boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)' }}></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Carbs</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>120g</div>
          <div style={{ height: '5px', backgroundColor: '#0b121f', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', backgroundColor: '#22d3ee', boxShadow: '0 0 8px rgba(34, 211, 238, 0.4)' }}></div>
          </div>
        </div>

        <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', padding: '14px 10px', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#bef264', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Fats</div>
          <div className="font-headline" style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>45g</div>
          <div style={{ height: '5px', backgroundColor: '#0b121f', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
            <div style={{ width: '35%', height: '100%', backgroundColor: '#bef264', boxShadow: '0 0 8px rgba(190, 242, 100, 0.4)' }}></div>
          </div>
        </div>
      </div>

      {/* 3. Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '16px', padding: '0 14px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search foods, meals, recipes..."
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '13px',
            padding: '14px 0',
            outline: 'none',
            fontWeight: '500'
          }}
        />
      </div>

      {/* 4. Food Items Shelf */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            FREQUENT MEALS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {foodItems.frequent.map((item, idx) => {
              const isLogged = loggedItems.includes(item.name);
              return (
                <div
                  key={idx}
                  onClick={() => toggleAddFood(item.name)}
                  style={{
                    backgroundColor: '#111b2b',
                    border: isLogged ? '1px solid #06b6d4' : '1px solid #1e2d44',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: isLogged ? '0 0 12px rgba(6, 182, 212, 0.25)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={item.img} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #1e2d44' }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{item.portion} • <span style={{ color: '#22d3ee', fontWeight: '700' }}>{item.calories} kcal</span></div>
                    </div>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isLogged ? '#06b6d4' : '#0b121f',
                    border: isLogged ? 'none' : '1px solid #1e2d44',
                    color: isLogged ? '#0c1324' : '#06b6d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '14px'
                  }}>
                    {isLogged ? '✓' : '+'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
            RECENT FOODS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {foodItems.recent.map((item, idx) => {
              const isLogged = loggedItems.includes(item.name);
              return (
                <div
                  key={idx}
                  onClick={() => toggleAddFood(item.name)}
                  style={{
                    backgroundColor: '#111b2b',
                    border: isLogged ? '1px solid #06b6d4' : '1px solid #1e2d44',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: isLogged ? '0 0 12px rgba(6, 182, 212, 0.25)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={item.img} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #1e2d44' }} />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{item.portion} • <span style={{ color: '#22d3ee', fontWeight: '700' }}>{item.calories} kcal</span></div>
                    </div>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isLogged ? '#06b6d4' : '#0b121f',
                    border: isLogged ? 'none' : '1px solid #1e2d44',
                    color: isLogged ? '#0c1324' : '#06b6d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '900',
                    fontSize: '14px'
                  }}>
                    {isLogged ? '✓' : '+'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Save / Log Button */}
      {loggedItems.length > 0 && (
        <button
          type="button"
          onClick={() => {
            if (onConfirmLog) onConfirmLog();
            onBack();
          }}
          style={{
            width: '100%',
            backgroundColor: '#06b6d4',
            color: '#0c1324',
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(6, 182, 212, 0.4)'
          }}
        >
          LOG {loggedItems.length} {loggedItems.length === 1 ? 'ITEM' : 'ITEMS'}
        </button>
      )}
    </div>
  );
};
