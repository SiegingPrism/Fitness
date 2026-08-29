import { Router } from 'express';
import { getAssignedAthletes } from '../controllers/coach.controller.js';

const router = Router();

router.get('/athletes', getAssignedAthletes);

export default router;
