import { Router } from 'express';
import { getAIUsageStats } from '../controllers/subscription.controller.js';

const router = Router();

router.get('/usage', getAIUsageStats);

export default router;
