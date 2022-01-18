import mongoose from 'mongoose';

const StudentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: ['Student name can not be empty'],
    },
    monthly: [
      {
        month: { type: Date }, //ISO kore dhukabo and ber korbo
        quality: {
          type: String,
          enum: ['Best', 'Good', 'Medium', 'Bad', 'Very Bad'],
          default: 'Medium',
        },
        regularPercentage: {//this will include attandance ,viva,homework marks
          type: Number,
          default: 0,
        },
        examPercentage: {//this will only count exam marks
          type: Number,
          default: 0,
          //jehetu ekhane test er ekta alada hisab ache ti total percentage ta ektu hisabe rakha dorkar .
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
