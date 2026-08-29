import { Request, Response, NextFunction } from 'express';
import { sendSuccess } from '../utils/apiResponse.js';
import { EntitlementsService } from '../services/entitlements.service.js';
import { SubscriptionTier } from '../models/Subscription.js';

export const getPlans = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const plans = [
      {
        id: 'plan_athlete_free',
        tier: 'ATHLETE_FREE',
        name: 'Athlete Starter',
        priceMonthly: 0,
        priceYearly: 0,
        popular: false,
        features: [
          'Basic Workout Logging',
          'Standard Exercise Catalog',
          '5 AI Coach prompts per day',
          'Community Challenges'
        ]
      },
      {
        id: 'plan_athlete_pro',
        tier: 'ATHLETE_PRO',
        name: 'Titan Athlete PRO',
        priceMonthly: 14.99,
        priceYearly: 129.99,
        popular: true,
        features: [
          'Everything in Starter',
          'Unlimited AI Adaptive Coaching',
          'Full 1RM Strength Curve & Volume Analytics',
          'Custom Multi-Week Program Builder',
          'Hydration & Macro Food Scanner',
          'Offline Workout Sync'
        ]
      },
      {
        id: 'plan_coach_pro',
        tier: 'COACH_PRO',
        name: 'Master Coach PRO',
        priceMonthly: 39.99,
        priceYearly: 349.99,
        popular: false,
        features: [
          'Manage Up to 50 Athletes',
          'Athlete Compliance Heatmaps & 1RM Alerts',
          'Multi-Week Routine Prescriptions',
          'Priority Client Messaging Feed',
          'Custom Branding & Invite Codes'
        ]
      },
      {
        id: 'plan_gym_business',
        tier: 'GYM_BUSINESS',
        name: 'Gym & Studio Enterprise',
        priceMonthly: 99.99,
        priceYearly: 899.99,
        popular: false,
        features: [
          'Unlimited Coaches & Athletes',
          'Facility Analytics & Check-in Kiosk',
          'Automated Member Billing',
          'Dedicated Success Manager'
        ]
      }
    ];

    sendSuccess(res, plans);
  } catch (err) {
    next(err);
  }
};

export const getCurrentSubscription = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tier: SubscriptionTier = 'ATHLETE_PRO';
    const entitlements = EntitlementsService.getEntitlementsSummary(tier);

    sendSuccess(res, {
      subscription: {
        tier,
        status: 'active',
        billingInterval: 'monthly',
        amount: 14.99,
        currency: 'USD',
        currentPeriodEnd: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
        cancelAtPeriodEnd: false
      },
      entitlements
    });
  } catch (err) {
    next(err);
  }
};

export const createCheckoutSession = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { tier, billingInterval } = req.body;
    const selectedTier = (tier as SubscriptionTier) || 'ATHLETE_PRO';

    sendSuccess(
      res,
      {
        checkoutUrl: 'https://checkout.kineticobsidian.io/mock-session',
        success: true,
        tier: selectedTier,
        billingInterval: billingInterval || 'monthly',
        entitlements: EntitlementsService.getEntitlementsSummary(selectedTier)
      },
      200,
      `Successfully upgraded to ${selectedTier}`
    );
  } catch (err) {
    next(err);
  }
};

export const getAIUsageStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    sendSuccess(res, {
      promptsUsedToday: 4,
      dailyQuota: 50,
      promptsRemainingToday: 46,
      monthlyTokensConsumed: 18450,
      monthlyTokenCap: 500000,
      tier: 'ATHLETE_PRO'
    });
  } catch (err) {
    next(err);
  }
};
