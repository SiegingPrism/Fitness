import React, { useState } from 'react';

interface Props {
  onBack: () => void;
}

export const JoinChallengeView: React.FC<Props> = ({ onBack }) => {
  const [joined, setJoined] = useState(false);

  return (
    <div style={{ padding: '16px', paddingBottom: '95px', maxWidth: '440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'Inter, sans-serif' }}>
      
      {/* 1. Header */}
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
          <div style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', color: '#06b6d4', letterSpacing: '0.6px' }}>COMMUNITY ARENA</div>
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Join Challenge</h1>
        </div>
      </div>

      {/* 2. Featured Challenge Hero Card */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #1e2d44',
        minHeight: '280px',
        backgroundImage: 'linear-gradient(to top, rgba(11, 18, 31, 0.95), rgba(11, 18, 31, 0.3)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ backgroundColor: '#06b6d4', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px', letterSpacing: '0.5px' }}>
            FEATURED CHALLENGE
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 className="font-headline" style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', lineHeight: '1.2', margin: 0 }}>
            30 Day Obsidian Strength
          </h2>
          <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
            Master the foundations of powerlifting. Push your absolute limits with high-intensity compound movements over four weeks.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <div style={{ display: 'flex' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324', marginLeft: '-8px' }} />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324', marginLeft: '-8px' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>+1,240 athletes enrolled</span>
          </div>

          <button
            type="button"
            onClick={() => setJoined(!joined)}
            className="font-headline"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: joined ? '#06b6d4' : '#bef264',
              color: '#0c1324',
              border: 'none',
              borderRadius: '16px',
              fontSize: '14px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px',
              boxShadow: joined ? '0 4px 16px rgba(6, 182, 212, 0.4)' : '0 4px 16px rgba(190, 242, 100, 0.4)'
            }}
          >
            <span>{joined ? 'Enrolled ✓' : 'Join Challenge Now'}</span>
          </button>
        </div>
      </div>

      {/* 3. Active Challenges Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: 0 }}>Active Community Challenges</h2>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#06b6d4', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80" alt="Cardio" style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '1px solid #1e2d44' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '15px' }}>Morning Cardio Blast</div>
              <div style={{ height: '6px', backgroundColor: '#0b121f', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: '#06b6d4', boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                <span>Day 13 of 20</span>
                <span style={{ color: '#22d3ee', fontWeight: '700' }}>65% Complete</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#111b2b', border: '1px solid #1e2d44', borderRadius: '18px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=200&q=80" alt="Pushup" style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover', border: '1px solid #1e2d44' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '800', color: '#ffffff', fontSize: '15px' }}>100 Push-ups Daily</div>
              <div style={{ height: '6px', backgroundColor: '#0b121f', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: '#bef264', boxShadow: '0 0 8px rgba(190, 242, 100, 0.4)' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginTop: '6px' }}>
                <span>Day 17 of 20</span>
                <span style={{ color: '#bef264', fontWeight: '700' }}>85% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
