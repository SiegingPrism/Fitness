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
        <button onClick={onBack} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#191f31', border: '1px solid #2e3447', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_back</span>
        </button>
        <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Join Challenge</h1>
      </div>

      {/* 2. Featured Challenge Hero Card */}
      <div style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid #2e3447',
        minHeight: '280px',
        backgroundImage: 'linear-gradient(to top, rgba(12, 19, 36, 0.95), rgba(12, 19, 36, 0.2)), url("https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=700&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}>
        <div>
          <span style={{ backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', padding: '4px 10px', borderRadius: '8px', letterSpacing: '0.5px' }}>
            FEATURED CHALLENGE
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h2 className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff', lineHeight: '1.2' }}>
            30 Day Obsidian Strength
          </h2>
          <p style={{ fontSize: '12px', color: '#c3c9b2', lineHeight: '1.4' }}>
            Master the foundations of powerlifting. Push your absolute limits with high-intensity compound movements over four weeks.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
            <div style={{ display: 'flex' }}>
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324' }} />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324', marginLeft: '-8px' }} />
              <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #0c1324', marginLeft: '-8px' }} />
            </div>
            <span style={{ fontSize: '12px', color: '#c3c9b2', fontWeight: '600' }}>+1.2k others joining</span>
          </div>

          <button
            onClick={() => setJoined(!joined)}
            className="font-headline"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: joined ? '#3cddc7' : '#bef264',
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
              boxShadow: '0 4px 14px rgba(190, 242, 100, 0.4)'
            }}
          >
            <span>{joined ? 'Joined ✓' : 'Join Now'}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', fontWeight: 'bold' }}>bolt</span>
          </button>
        </div>
      </div>

      {/* 3. Active Challenges Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Active Challenges</h2>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#bef264', cursor: 'pointer' }}>View All</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '18px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80" alt="Cardio" style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '15px' }}>Morning Cardio Blast</div>
              <div style={{ height: '6px', backgroundColor: '#23293c', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: '#bef264' }}></div>
              </div>
              <div style={{ fontSize: '11px', color: '#8d9882', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>65%</span>
                <span>12 days remaining</span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#8d9882' }}>chevron_right</span>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '18px', padding: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=200&q=80" alt="Shred" style={{ width: '56px', height: '56px', borderRadius: '14px', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '15px' }}>Upper Body Shred</div>
              <div style={{ height: '6px', backgroundColor: '#23293c', borderRadius: '3px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ width: '22%', height: '100%', backgroundColor: '#bef264' }}></div>
              </div>
              <div style={{ fontSize: '11px', color: '#8d9882', marginTop: '6px', display: 'flex', justifyContent: 'space-between' }}>
                <span>22%</span>
                <span>24 days remaining</span>
              </div>
            </div>
            <span className="material-symbols-outlined" style={{ color: '#8d9882' }}>chevron_right</span>
          </div>
        </div>
      </div>

      {/* 4. Explore Communities 2x2 Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>Explore Communities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { title: 'Zen Warriors', members: '1.5k Active Members', img: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=400&q=80' },
            { title: 'Velocity Squad', members: '850 Active Members', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80' },
            { title: 'Power Elite', members: '2.1k Active Members', img: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=400&q=80' },
            { title: 'Trail Blazers', members: '1.2k Active Members', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' }
          ].map((comm, idx) => (
            <div key={idx} style={{
              height: '120px',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid #2e3447',
              backgroundImage: `linear-gradient(to top, rgba(12, 19, 36, 0.9), rgba(12, 19, 36, 0.2)), url("${comm.img}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              cursor: 'pointer'
            }}>
              <div style={{ fontWeight: 'bold', color: '#ffffff', fontSize: '14px' }}>{comm.title}</div>
              <div style={{ fontSize: '10px', color: '#8d9882', marginTop: '2px' }}>{comm.members}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Create Your Own Card */}
      <div style={{ border: '2px dashed #2e3447', borderRadius: '20px', padding: '20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#191f31', color: '#bef264', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
        </div>
        <div>
          <h3 className="font-headline" style={{ fontSize: '15px', fontWeight: 'bold', color: '#ffffff' }}>Create your own?</h3>
          <p style={{ fontSize: '12px', color: '#8d9882', marginTop: '4px' }}>Start a private challenge for you and your friends.</p>
        </div>
        <button style={{ padding: '8px 20px', backgroundColor: 'transparent', border: '1px solid #bef264', color: '#bef264', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
          Get Started
        </button>
      </div>
    </div>
  );
};
