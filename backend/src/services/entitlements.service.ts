import { SubscriptionTier } from '../models/Subscription.js';

export type FeatureFlag =
  | 'ADVANCED_ANALYTICS'
  | 'AI_COACH_UNLIMITED'
  | 'CUSTOM_WORKOUT_TEMPLATES'
  | 'CLIENT_ROSTER_EXPANDED'
  | 'DATA_EXPORT_CSV'
  | 'PRIORITY_COACH_SUPPORT';

export interface EntitlementRule {
  allowedTiers: SubscriptionTier[];
  maxClients?: number;
  maxMonthlyAIPrompts?: number;
}

export const FEATURE_ENTITLEMENTS: Record<FeatureFlag, EntitlementRule> = {
  ADVANCED_ANALYTICS: {
    allowedTiers: ['ATHLETE_PRO', 'COACH_PRO', 'GYM_BUSINESS']
  },
  AI_COACH_UNLIMITED: {
    allowedTiers: ['ATHLETE_PRO', 'COACH_PRO', 'GYM_BUSINESS'],
    maxMonthlyAIPrompts: 1000
  },
  CUSTOM_WORKOUT_TEMPLATES: {
    allowedTiers: ['ATHLETE_PRO', 'COACH_PRO', 'GYM_BUSINESS']
  },
  CLIENT_ROSTER_EXPANDED: {
    allowedTiers: ['COACH_PRO', 'GYM_BUSINESS'],
    maxClients: 100
  },
  DATA_EXPORT_CSV: {
    allowedTiers: ['ATHLETE_PRO', 'COACH_PRO', 'GYM_BUSINESS']
  },
  PRIORITY_COACH_SUPPORT: {
    allowedTiers: ['COACH_PRO', 'GYM_BUSINESS']
  }
};

export class EntitlementsService {
  public static isFeatureEnabled(tier: SubscriptionTier, feature: FeatureFlag): boolean {
    const rule = FEATURE_ENTITLEMENTS[feature];
    if (!rule) return false;
    return rule.allowedTiers.includes(tier);
  }

  public static getEntitlementsSummary(tier: SubscriptionTier) {
    return {
      tier,
      canAccessAdvancedAnalytics: this.isFeatureEnabled(tier, 'ADVANCED_ANALYTICS'),
      canAccessUnlimitedAI: this.isFeatureEnabled(tier, 'AI_COACH_UNLIMITED'),
      canCreateCustomTemplates: this.isFeatureEnabled(tier, 'CUSTOM_WORKOUT_TEMPLATES'),
      canExpandClientRoster: this.isFeatureEnabled(tier, 'CLIENT_ROSTER_EXPANDED'),
      maxClients: tier === 'COACH_PRO' || tier === 'GYM_BUSINESS' ? 100 : 3,
      maxDailyAIPrompts: tier === 'ATHLETE_PRO' || tier === 'COACH_PRO' || tier === 'GYM_BUSINESS' ? 50 : 5
    };
  }
}
