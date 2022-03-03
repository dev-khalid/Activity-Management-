import mongoose from 'mongoose';

const targetSchema = mongoose.Schema(
  {
    userId: { type: 'string', required: ['User id is required.'] },
    title: {
      type: String,
      rquired: ['Title of a target is required!'],
    },
    tasks: [
      {
        task: String,
        deadline: Date,
        done: Boolean,
      },
    ],
    deadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    accomplished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//need to know more about mongoose middleware queries .thease are so powerful

//pre query
//post query

const Target = mongoose.model('Target', targetSchema);
export default Target;

/**
 * main deadline should be marged from tasks array the maximum of time should be the deadline ....
 */
