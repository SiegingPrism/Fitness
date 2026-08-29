import { Router } from 'express';
import { getProgressAnalytics } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/progress', getProgressAnalytics);

export default router;
