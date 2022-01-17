import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['Student name can not be empty'],
    },
    rank: {
      type: Number,
    },
    quality: {
      type: String,
      enum: ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
