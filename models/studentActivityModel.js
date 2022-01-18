import mongoose from 'mongoose';

const StudentActivitySchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      ref: 'Student',
      required: ['UserName Object is requierd.'],
    },
    attandance: {
      type: Boolean,
      required: true,
      default: false,
    },
    homeworkGiven: { 
      type: Boolean,
      default: true, 
      required: true, 
    }, 
    homework: {
      //ei field ta ami frontend a show korbo na jodi amar homeworkGiven zero hoy .
      type: Number,
      default: 0,
      required: true,
    },
    late: {
      type: Number,
      default: 0,
      required: true,
    },
    vivaAsked: { 
      type: Number, 
      default: 0, 
    },
    vivaAnswered: {
      //ei field ta ami frontend a show korbo na jodi amar viva asked zero hoy .
      type: Number,
      default: 0,
    },
    testFullMark: { 
      type: Number,
      default: 0, 
    }, 
    testSubject: { 
      type: String, 
      enum: ['None', 'Physics', 'Math','Ict'], 
      default: 'None', 
    }, 
    testScore: {
      //ei field ta ami frontend a show korbo na jodi amar test full mark 0 hoy .
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
const StudentActivity = mongoose.model(
  'StudentActivity',
  StudentActivitySchema
);
export default StudentActivity;
