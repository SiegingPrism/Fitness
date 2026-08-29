import React, { useState } from 'react';
import { checkoutPlan } from '../../services/api.js';

interface Props {
  onBack: () => void;
}

export const SubscriptionView: React.FC<Props> = ({ onBack }) => {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string>('ATHLETE_PRO');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeSuccessMessage, setUpgradeSuccessMessage] = useState<string | null>(null);

  const plans = [
    {
      id: 'ATHLETE_FREE',
      name: 'Athlete Starter',
      priceMonthly: 0,
      priceYearly: 0,
      tag: 'Basic',
      features: [
        'Standard Workout Logging',
        'Master Exercise Library',
        '5 AI Coach prompts / day',
        'Community Challenges'
      ]
    },
    {
      id: 'ATHLETE_PRO',
      name: 'Titan Athlete PRO',
      priceMonthly: 14.99,
      priceYearly: 129.99,
      tag: 'Most Popular',
      popular: true,
      features: [
        'Everything in Starter',
        'Unlimited AI Adaptive Coaching',
        'Full 1RM Strength Curve & Volume Analytics',
        'Custom Multi-Week Program Builder',
        'Hydration & Macro Food Scanner',
        'Offline Workout Sync & Cloud Backup'
      ]
    },
    {
      id: 'COACH_PRO',
      name: 'Master Coach PRO',
      priceMonthly: 39.99,
      priceYearly: 349.99,
      tag: 'Coaches',
      features: [
        'Manage Up to 50 Athletes',
        'Client Compliance Heatmaps & 1RM Alerts',
        'Multi-Week Routine Prescriptions',
        'Priority Client Messaging Feed',
        'Custom Branding & Invite Codes'
      ]
    }
  ];

  const handleUpgrade = async () => {
    setIsUpgrading(true);
    const result = await checkoutPlan(selectedPlan, billingInterval);
    setIsUpgrading(false);
    if (result && result.success) {
      setUpgradeSuccessMessage(`🎉 Successfully upgraded to ${selectedPlan.replace('_', ' ')}! Entitlements are now active.`);
      setTimeout(() => {
        setUpgradeSuccessMessage(null);
      }, 4000);
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
          <h1 className="font-headline" style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>Subscriptions & Plans</h1>
        </div>
      </div>

      {/* Success Notification Alert */}
      {upgradeSuccessMessage && (
        <div style={{ backgroundColor: '#151b2d', border: '1px solid #bef264', color: '#bef264', padding: '14px', borderRadius: '16px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 4px 14px rgba(190, 242, 100, 0.2)' }}>
          {upgradeSuccessMessage}
        </div>
      )}

      {/* 2. Hero Pro Badge & Intro */}
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#191f31', border: '2px solid #bef264', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#bef264' }}>workspace_premium</span>
        </div>
        <h2 className="font-headline" style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffffff' }}>Unlock Your Peak Potential</h2>
        <p style={{ fontSize: '13px', color: '#8d9882', maxWidth: '340px' }}>
          Get unrestricted access to adaptive AI coaching, automated 1RM strength analytics, and coach prescriptions.
        </p>
      </div>

      {/* 3. Monthly / Yearly Billing Toggle */}
      <div style={{ display: 'flex', backgroundColor: '#151b2d', border: '1px solid #2e3447', borderRadius: '24px', padding: '4px', maxWidth: '280px', margin: '0 auto', width: '100%' }}>
        <button
          onClick={() => setBillingInterval('monthly')}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: '20px',
            backgroundColor: billingInterval === 'monthly' ? '#bef264' : 'transparent',
            color: billingInterval === 'monthly' ? '#0c1324' : '#8d9882',
            fontWeight: 'bold',
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingInterval('yearly')}
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: '20px',
            backgroundColor: billingInterval === 'yearly' ? '#bef264' : 'transparent',
            color: billingInterval === 'yearly' ? '#0c1324' : '#8d9882',
            fontWeight: 'bold',
            fontSize: '13px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px'
          }}
        >
          <span>Yearly</span>
          <span style={{ fontSize: '9px', backgroundColor: '#ff5c5c', color: '#fff', padding: '2px 6px', borderRadius: '8px' }}>SAVE 25%</span>
        </button>
      </div>

      {/* 4. Plans Card Deck */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const price = billingInterval === 'monthly' ? plan.priceMonthly : plan.priceYearly;
          const priceDisplay = price === 0 ? 'Free' : `$${price}${billingInterval === 'monthly' ? '/mo' : '/yr'}`;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              style={{
                backgroundColor: '#151b2d',
                border: isSelected ? '2px solid #bef264' : '1px solid #2e3447',
                borderRadius: '20px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 4px 20px rgba(190, 242, 100, 0.15)' : 'none',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <span style={{ position: 'absolute', top: '-10px', right: '18px', backgroundColor: '#bef264', color: '#0c1324', fontSize: '10px', fontWeight: '900', padding: '3px 10px', borderRadius: '12px', letterSpacing: '0.5px' }}>
                  {plan.tag}
                </span>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="font-headline" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>{plan.name}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: isSelected ? '#bef264' : '#3cddc7', marginTop: '4px' }}>
                    {priceDisplay}
                  </div>
                </div>

                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: isSelected ? '6px solid #bef264' : '2px solid #2e3447',
                  backgroundColor: '#0c1324'
                }}></div>
              </div>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #23293c', paddingTop: '12px' }}>
                {plan.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#dce1fb' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#bef264' }}>check_circle</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Upgrade Action Button */}
      <button
        onClick={handleUpgrade}
        disabled={isUpgrading}
        className="font-headline"
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#bef264',
          color: '#0c1324',
          border: 'none',
          borderRadius: '18px',
          fontSize: '15px',
          fontWeight: '900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(190, 242, 100, 0.4)'
        }}
      >
        <span>{isUpgrading ? 'Activating Subscription...' : 'Confirm Plan & Activate'}</span>
        <span className="material-symbols-outlined" style={{ fontSize: '20px', fontWeight: 'bold' }}>bolt</span>
      </button>

      {/* Restore Purchases / Terms Footer */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px', color: '#8d9882' }}>
        <span style={{ cursor: 'pointer' }}>Restore Purchases</span>
        <span>•</span>
        <span style={{ cursor: 'pointer' }}>Terms of Service</span>
        <span>•</span>
        <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
      </div>
    </div>
  );
};
