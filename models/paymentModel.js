import mongoose from 'mongoose';
const paymentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Types.ObjectId(),
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  },
  paymentOf: {
    type: Date,
  },
  paidAt: {
    type: Date,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
