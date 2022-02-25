import mongoose from 'mongoose';

const ExerciseSchema = mongoose.Schema({
  date: Date,
  done: { type: Boolean, default: false },
  description: {
    type: String,
  },
  userId: { type: String, required: true },
  timeOfExercise: {
    type: Number,
  },
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);
export default Exercise;
