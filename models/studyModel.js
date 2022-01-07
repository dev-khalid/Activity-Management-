import mongoose from 'mongoose';

const studySchema = mongoose.Schema(
  {
    userId: {
      type: 'string',
      required: ['There Must Be an User Id'],
    },
    targetHour: {
      type: 'number',
      required: ['Target Hour is Required'],
    },
    completed: {
      type: 'number',
      default: 0,
      required: ['There Must Be an User Id'],
    },
  },
  { timestamps: true }
);

const Study = mongoose.model('Study', studySchema);
export default Study;
