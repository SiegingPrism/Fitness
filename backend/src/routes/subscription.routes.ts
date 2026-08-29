import { Router } from 'express';
import {
  getPlans,
  getCurrentSubscription,
  createCheckoutSession
} from '../controllers/subscription.controller.js';

const router = Router();

router.get('/plans', getPlans);
router.get('/current', getCurrentSubscription);
router.post('/checkout', createCheckoutSession);

export default router;
