import express from 'express';
import {
  allAchievements,
  achievements,
} from '../controllers/achievementHandler.js';
const router = express.Router();

router.route('/data/:page/:userId').get(achievements);
router.route('/count/:userId').get(allAchievements);

export default router;
