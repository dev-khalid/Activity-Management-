import mongoose from 'mongoose';
/**
 * @TODO
 * 1.userId should be varified userId coming from user collection .
 * 2.I should use jwt for authentication .
 * 3.First let's focus on making front end dybamic then think about authentication
 */
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
    date: Date,
  },
  { timestamps: true }
);

const Study = mongoose.model('Study', studySchema);
export default Study;
