import express from 'express';
import {
  createTarget,
  getMonthlyData,
  getTodaysData,
  updateCompleted,
  updateTarget,
  getMonthlyStudyHours,
  getSelctedDaysData,
} from '../controllers/studyHandler.js';
// import authorization from '../controllers/authController.js';

const router = express.Router();
// router.use(authorization); authentication middleware should be implemented anyhow.
router.post('/', createTarget);
router.patch('/target', updateTarget);
router.patch('/completed', updateCompleted);
router.get('/todaysdata/:userId', getTodaysData);
router.get('/sutdyData/:userId/:date',getSelctedDaysData); 
router.get('/monthlydata/:userId', getMonthlyData);
router.get('/monthlyStudyHours/:month/:year/:userId', getMonthlyStudyHours);

export default router;
