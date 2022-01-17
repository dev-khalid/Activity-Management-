import mongoose from 'mongoose';
const BasicConfigurationSchema = mongoose.Schema(
  {
    homeworkGiven: {
      type: Boolean,
      default: 0,
      required: true,
    },
    vivaAsked: {
      type: Number,
      defualt: 0,
      requried: true,
    },
    testSubject: {
      type: String,
      enum: ['None', 'Physics', 'Math', 'Ict'],
      default: 'None',
    },
    testFullMark: {
      type: Number,
      default: 0, //test full mark er upore depend koreu kintu amra bolte pari je ajek kono test chilo na .
    },
  },
  {
    timestamps: true,
  }
);
