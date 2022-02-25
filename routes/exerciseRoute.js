import { Router } from 'express';
import {
  updateData,
  createExercise,
  getMonthlyData,
} from '../controllers/exerciseHandler.js';

const router = Router();
router.route('/').post( createExercise).patch(updateData);
router.get('/:userId/:date') 

export default router;
