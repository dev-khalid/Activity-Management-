import asyncHandler from 'express-async-handler';
import Study from '../models/studyModel.js';
import moment from 'moment';
// //Helper functions
// const monthsStartingAtMiliseconds = (date = new Date()) => {
//   return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
// };
// function getNumberOfDaysInMonth(date = new Date()) {
//   return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
// }

const todaysStartingAtMiliseconds = (date = new Date()) => {
  return new Date(date.toDateString()).getTime();
};

//this one is checked
export const createTarget = asyncHandler(async (req, res) => {
  const { date, userId, targetHour } = req.body;
  date = moment(date).startOf('day');
  const data = await Study.create({ userId, targetHour, date });
  res.status(201).json(data);
});

//this one is checked
export const updateTarget = asyncHandler(async (req, res) => {
  const { userId, targetHour, date } = req.body;
  const data = await Study.findOneAndUpdate(
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
    { targetHour: targetHour },

    {
      new: true,
    }
  );
  res.json(data);
});

//this one is checked
export const updateCompleted = asyncHandler(async (req, res) => {
  const { userId, completed, date } = req.body;
  const data = await Study.findOneAndUpdate(
    {
      userId,
      $and: [
        { date: { $gte: moment(date).startOf('day') } },
        { date: { $lte: moment(date).endOf('day') } },
      ],
    },
    { completed },
    {
      new: true,
    }
  );
  res.json(data);
});

//
export const getTodaysData = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = await Study.findOne({
    userId,
    $and: [
      { date: { $gte: todaysStartingAtMiliseconds() } },
      { date: { $lte: todaysStartingAtMiliseconds() + 86400000 } },
    ],
  });
  res.json(data);
});
export const getSelctedDaysData = asyncHandler(async (req, res) => {
  const { userId, date } = req.params;
  const data = await Study.findOne({
    userId,
    $and: [
      { date: { $gte: moment(date).startOf('day') } },
      { date: { $lte: moment(date).endOf('day') } },
    ],
  });
  res.json(data);
});

export const getMonthlyData = asyncHandler(async (req, res) => {
  let { userId, date } = req.params;
  if (!date) date = new Date();
  const data = await Study.find({
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
  let hours = 0;
  data.forEach((obj) => {
    hours += obj.completed;
  });
  res.json({ data, hours });
});
export const getMonthlyStudyHours = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  let date = `${req.params.year || new Date().getFullYear()}-${
    req.params.month || new Date().getMonth() + 1
  }-01`;

  const data = await Study.find({
    userId,
    $and: [
      { createdAt: { $gte: new Date(date).toISOString() } },
      {
        createdAt: {
          $lte: moment(date).endOf('month'),
        },
      },
    ],
  });
  let hours = 0;
  data.forEach((obj) => {
    hours += obj.completed;
  });
  res.json({ hours });
});

//now i need to back-up the data first and then finally modify them and then seed them .

/**@TODO
 * 1.if no date is provided then i should keep an option to search by created at .
 * 2.i need to update my database .
 */
