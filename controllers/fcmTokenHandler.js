import expressAsyncHandler from 'express-async-handler';
import FcmToken from '../models/fcmTokenModel.js';

export const storeFcmToken = expressAsyncHandler(async (req, res) => {
  const token = req.body;
  const data = await FcmToken.create(token);
  res.status(201).end();
});

export const getFcmTokens = expressAsyncHandler(async (req, res) => {
  const tokens = await FcmToken.find().select('token -_id');
  const data = tokens.map((token) => token.token);
  
  res.json(data);
});