import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['Student name can not be empty'],
    },
    rank: {
      type: Number,
      default: 0,
    },
    quality: {
      type: String,
      enum: ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'],
      default: 'Medium',
    },
    average: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
