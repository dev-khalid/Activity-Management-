import express from 'express';
import {
  deleteTarget,
  updateTarget,
  createTarget,
  getTarget,
} from '../controllers/targetHandler.js';
const router = express.Router();

//ekebarei backend take insecure rakha hocche eita ashole thik na .
//frontend theke ekta cookie set kora dorkar chilo uid diye  .  then finally sei cookie ta backend a validate kora dorkar chilo ... but it's an issue eivabe ashole backend ke chere dewa ekebarei ucit hoy nai . Here passport js can be very much handy .

router.route('/').post(createTarget).patch(updateTarget);
router.route('/:page/:userId').get(getTarget);
router.delete('/:id',deleteTarget) 
export default router;
