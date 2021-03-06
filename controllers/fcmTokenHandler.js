import expressAsyncHandler from 'express-async-handler';
import FcmToken from '../models/fcmTokenModel.js';

export const storeFcmToken = expressAsyncHandler(async (req, res) => {
  const token = req.body;
  const exist = await FcmToken.find(token).count();
  if (!exist) await FcmToken.create(token);
  res.status(201).end();
});
