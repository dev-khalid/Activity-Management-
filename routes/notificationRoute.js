import express from 'express';
import fetch from 'node-fetch';
import { getFcmTokens, storeFcmToken } from '../controllers/fcmTokenHandler.js';
import FcmToken from '../models/fcmTokenModel.js';
import expressAsyncHandler from 'express-async-handler';
const router = express.Router();
router.post('/storefcmtoken', storeFcmToken);
router.get('/getfcmtokens',getFcmTokens); 
router.post('/sendtoall', expressAsyncHandler( async(req, res) => {
  const tokens = await FcmToken.find().select('token -_id');
  const fcm_tokens = tokens.map((token) => token.token);
  const notification = req.body; 

  // const fcm_tokens = [
  //   'fYJhG_ulmG5jiIxtMV-s_V:APA91bHushzq60o8Q0O0hR8R7Gunnu7R0lRvh0rEJtZ2UGOh9J5XiEvt9mxssHtFqb44x1bJN6PTt2RgSoFutX3v5dvggWixZiZx2Pl68C_wnyhcXAwj3F9delMOShA0OAWzLM0vOJxo  ',
  // ];
  const notification_body = {
    notification: notification,
    registration_ids: fcm_tokens,
  };
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      Authorization:
        'key=AAAAPhuXJSg:APA91bEpdKDDTRIpqMyVwQ5_8h9W6SJjTjV9VoOfjubgEOjxQGFpC9dPy6OmP8Btxdi3ZIn_arvcU6_OclhElX_d82Fp7fb732KetrbQIsx7EqihE2Pdz13rAPC-Y0o7aeRgT0M72jZ3',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notification_body),
    // "to" : "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
    direct_boot_ok: true,
  })
    .then(() => {
      res.send('Notification Sent ');
    })
    .catch((err) => res.send('Something Went Wrong'));
}));

export default router;

//payment er jonne separate route thakbe somossa nai .
