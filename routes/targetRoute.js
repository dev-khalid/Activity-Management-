import express from 'express';
import {
  deleteTarget,
  updateTarget,
  createTarget,
} from '../controllers/targetHandler';
const router = express.Router();

router.route('/').post(createTarget).patch(updateTarget);
router.route('/:page/:userId').get(); 
export default router;
