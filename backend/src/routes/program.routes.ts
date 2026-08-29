import { Router } from 'express';
import { getPrograms, createProgram } from '../controllers/program.controller.js';

const router = Router();

router.get('/', getPrograms);
router.post('/', createProgram);

export default router;
