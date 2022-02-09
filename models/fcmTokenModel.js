import mongoose from 'mongoose';

const fcmTokenSchema = mongoose.Schema({
  token: {
    type: 'string',
    required: true,
  },
});

const FcmToken = mongoose.model('fcmToken', fcmTokenSchema);
export default FcmToken;
