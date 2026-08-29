import React, { useState } from 'react';

interface Props {
  onComplete: () => void;
  onBackToLogin: () => void;
}

export const OnboardingView: React.FC<Props> = ({ onComplete, onBackToLogin }) => {
  const [step, setStep] = useState(1);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(76.5);
  const [experience, setExperience] = useState('INTERMEDIATE');

  const totalSteps = 4;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#0c1324' }}>
      <div style={{ width: '100%', maxWidth: '500px', backgroundColor: '#151b2d', padding: '32px 24px', borderRadius: '16px', border: '1px solid #2e3447' }}>
        {/* Progress Bar */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '600', color: '#c3c9b2', marginBottom: '6px' }}>
            <span>STEP {step} OF {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#2e3447', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${(step / totalSteps) * 100}%`, height: '100%', backgroundColor: '#bef264', transition: 'width 0.3s ease' }}></div>
          </div>
        </div>

        <form onSubmit={handleNext}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Baseline Metrics</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#c3c9b2', marginBottom: '4px' }}>Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    required
                    style={{ width: '100%', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: '#c3c9b2', marginBottom: '4px' }}>Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    required
                    style={{ width: '100%', backgroundColor: '#23293c', border: '1px solid #2e3447', borderRadius: '10px', padding: '10px', color: '#fff' }}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Training Experience</h2>
              {['BEGINNER', 'INTERMEDIATE', 'ADVANCED'].map((lvl) => (
                <label
                  key={lvl}
                  onClick={() => setExperience(lvl)}
                  style={{
                    padding: '14px',
                    backgroundColor: '#191f31',
                    borderRadius: '12px',
                    border: experience === lvl ? '2px solid #bef264' : '1px solid #2e3447',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <input type="radio" checked={experience === lvl} onChange={() => {}} />
                  <div>
                    <div style={{ fontWeight: '600' }}>{lvl}</div>
                    <div style={{ fontSize: '12px', color: '#c3c9b2' }}>
                      {lvl === 'BEGINNER' ? '< 1 year training' : lvl === 'INTERMEDIATE' ? '1–3 years training' : '3+ years training'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Primary Goal</h2>
              <div style={{ padding: '16px', backgroundColor: '#191f31', border: '2px solid #bef264', borderRadius: '12px' }}>
                <span className="material-symbols-outlined" style={{ color: '#bef264', fontSize: '32px' }}>fitness_center</span>
                <div style={{ fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>Hypertrophy & Muscle Growth</div>
                <div style={{ fontSize: '12px', color: '#c3c9b2' }}>Optimize rep ranges and volume for muscle gain</div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Ready to Train!</h2>
              <p style={{ fontSize: '13px', color: '#c3c9b2' }}>Your personalized dashboard has been prepared based on your inputs.</p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #2e3447' }}>
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', color: '#c3c9b2', cursor: 'pointer' }}>Back</button>
            ) : (
              <button type="button" onClick={onBackToLogin} style={{ background: 'none', border: 'none', color: '#c3c9b2', cursor: 'pointer' }}>Back to Login</button>
            )}
            <button
              type="submit"
              className="font-headline"
              style={{ padding: '12px 24px', backgroundColor: '#bef264', color: '#0c1324', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {step === totalSteps ? 'COMPLETE ONBOARDING' : 'NEXT'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
