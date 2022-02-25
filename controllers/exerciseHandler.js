import Exercise from '../models/exerciseModel.js';
import expressAsyncHandler from 'express-async-handler';
import moment from 'moment';
/**
 * @ROUTE post - /api/exercise
 * @Request body - userId, date, timeOfExercise,description,done
 */
export const createExercise = expressAsyncHandler(async (req, res) => {
  let { date, userId, timeOfExercise, description, done } = req.body;
  date = moment(date).format();
  const data = await Exercise.create({
    date,
    userId,
    timeOfExercise,
    description,
    done,
  });
  res.json(data);
});
/**
 * @ROUTE get - /api/exercise/:userId/:date
 */
export const getMonthlyData = expressAsyncHandler(async (req, res) => {
  let { userId, date } = req.params;
  if (!date) date = new Date();
  const data = await Exercise.find({
    userId,
    $and: [
      { date: { $gte: moment(date).startOf('month') } },
      {
        date: {
          $lte: moment(date).endOf('month'),
        },
      },
    ],
  });

  res.json(data);
});

/**
 * @ROUTE post - /api/exercise
 * @Request body - userId, date, timeOfExercise,description,done
 */
export const updateData = expressAsyncHandler(async (req, res) => {
  const { userId, done, description, timeOfExercise, date } = req.body;
  let updateObj = {};
  if (req.body.hasOwnProperty('done')) updateObj.done = done;
  if (req.body.hasOwnProperty('description'))
    updateObj.description = description;
  if (req.body.hasOwnProperty('timeOfExercise'))
    updateObj.timeOfExercise = timeOfExercise;
  const data = await Exercise.findOneAndUpdate(
    {
      userId,
      $and: [
        {
          date: {
            $gte: moment(date).startOf('day'),
          },
        },
        {
          date: {
            $lte: moment(date).endOf('day'),
          },
        },
      ],
    },
    { ...updateObj },
    {
      new: true,
    }
  );
  res.json(data);
});
