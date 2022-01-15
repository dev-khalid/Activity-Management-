import express from 'express';
import {
  allAchievements,
  achievements,
} from '../controllers/achievementHandler.js';
const router = express.Router();

router.route('/:page/:userId').get(achievements);
router.route('/all/:page/:userId').get(allAchievements);

export default router;
