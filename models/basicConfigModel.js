import mongoose from 'mongoose';
const basicConfigSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  homeworkGiven: {
    type: Boolean,
    default: true,
    required: true,
  },
  vivaAsked: {
    type: Number,
    default: 0,
  },
  testFullMark: {
    type: Number,
    default: 0,
  },
  testSubject: {
    type: String,
    enum: ['None', 'Physics', 'Math', 'Ict'],
    default: 'None',
  },
});

const BasicConfig = mongoose.model('BasicConfig', basicConfigSchema);
export default BasicConfig;
