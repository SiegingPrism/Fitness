import React, { useState } from 'react';

interface Props {
  onLoginSuccess: (role: 'ATHLETE' | 'COACH') => void;
  onNavigateOnboarding: () => void;
}

export const LoginView: React.FC<Props> = ({ onLoginSuccess, onNavigateOnboarding }) => {
  const [role, setRole] = useState<'ATHLETE' | 'COACH'>('ATHLETE');
  const [email, setEmail] = useState('alex@kinetic.io');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(role);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      backgroundColor: '#0c1324'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#151b2d',
        padding: '32px 24px',
        borderRadius: '16px',
        border: '1px solid #2e3447',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#bef264',
            color: '#0c1324',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '28px', fontWeight: 'bold' }}>bolt</span>
          </div>
          <h1 className="font-headline" style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>KINETIC OBSIDIAN</h1>
          <p style={{ fontSize: '13px', color: '#c3c9b2', marginTop: '4px' }}>Sign in to your Coach or Athlete account</p>
        </div>

        {/* Role Toggle */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4px',
          padding: '4px',
          backgroundColor: '#191f31',
          borderRadius: '12px',
          border: '1px solid #2e3447',
          marginBottom: '20px'
        }}>
          <button
            type="button"
            onClick={() => setRole('ATHLETE')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: role === 'ATHLETE' ? '#bef264' : 'transparent',
              color: role === 'ATHLETE' ? '#0c1324' : '#c3c9b2'
            }}
          >
            Athlete
          </button>
          <button
            type="button"
            onClick={() => setRole('COACH')}
            style={{
              padding: '8px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              backgroundColor: role === 'COACH' ? '#bef264' : 'transparent',
              color: role === 'COACH' ? '#0c1324' : '#c3c9b2'
            }}
          >
            Coach
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: '#c3c9b2', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#23293c',
                border: '1px solid #2e3447',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: '#c3c9b2', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#23293c',
                border: '1px solid #2e3447',
                borderRadius: '12px',
                padding: '12px 16px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            className="font-headline"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#bef264',
              color: '#0c1324',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span>LOG IN TO DASHBOARD</span>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#c3c9b2' }}>
          Don't have an account?{' '}
          <button
            onClick={onNavigateOnboarding}
            style={{ background: 'none', border: 'none', color: '#a4d64c', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Start Athlete Onboarding
          </button>
        </div>
      </div>
    </div>
  );
};
