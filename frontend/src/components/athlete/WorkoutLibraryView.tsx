import React, { useState } from 'react';

interface Props {
  onSelectExercise?: (exerciseId: string) => void;
}

export const WorkoutLibraryView: React.FC<Props> = ({ onSelectExercise }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const exercises = [
    {
      id: 'ex_1',
      name: 'Barbell Bench Press',
      category: 'Chest',
      pattern: 'Horizontal Push',
      equipment: 'Barbell',
      level: 'Intermediate',
      primary: 'Pectoralis Major',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ex_2',
      name: 'Dumbbell Bench Press',
      category: 'Chest',
      pattern: 'Horizontal Push',
      equipment: 'Dumbbells',
      level: 'Beginner',
      primary: 'Chest',
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ex_3',
      name: 'Incline Dumbbell Press',
      category: 'Chest',
      pattern: 'Incline Push',
      equipment: 'Dumbbells',
      level: 'Intermediate',
      primary: 'Upper Chest',
      img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ex_6',
      name: 'Barbell Back Squat',
      category: 'Legs',
      pattern: 'Squat',
      equipment: 'Barbell',
      level: 'Advanced',
      primary: 'Quads & Glutes',
      img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'ex_10',
      name: 'Barbell Deadlift',
      category: 'Back',
      pattern: 'Hinge',
      equipment: 'Barbell',
      level: 'Advanced',
      primary: 'Posterior Chain',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const filtered = exercises.filter((e) => {
    const matchCategory = selectedCategory === 'All' || e.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.primary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Exercise Library</h1>
          <p style={{ fontSize: '12px', color: '#8d9882' }}>Over 250+ Master Biomechanical Movements</p>
        </div>
        <button style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
        </button>
      </div>

      {/* 2. Search Bar */}
      <div style={{ position: 'relative', width: '100%' }}>
        <span className="material-symbols-outlined" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#8d9882', fontSize: '20px' }}>search</span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by exercise or muscle..."
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

      {/* 3. Category Filter Chips */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              backgroundColor: selectedCategory === cat ? '#bef264' : '#151b2d',
              color: selectedCategory === cat ? '#0c1324' : '#ffffff',
              fontWeight: 'bold',
              fontSize: '12px',
              border: selectedCategory === cat ? 'none' : '1px solid #2e3447',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 4. Exercise Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectExercise && onSelectExercise(item.id)}
            style={{
              backgroundColor: '#151b2d',
              border: '1px solid #2e3447',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={item.img} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '15px' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#8d9882', marginTop: '2px' }}>
                  {item.primary} • <span style={{ color: '#3cddc7' }}>{item.equipment}</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '10px', backgroundColor: '#191f31', color: '#bef264', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                    {item.pattern}
                  </span>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#8d9882' }}>chevron_right</span>
          </div>
        ))}
      </div>
    </div>
  );
};
