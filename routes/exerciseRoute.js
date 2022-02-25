import { Router } from 'express';
import {
  updateData,
  createExercise,
  getMonthlyData,
} from '../controllers/exerciseHandler.js';

const router = Router();
router.post('/', createExercise);
router.patch('/:userId/:date', getMonthlyData);
router.get('/:userId/:date', updateData);

export default router;
