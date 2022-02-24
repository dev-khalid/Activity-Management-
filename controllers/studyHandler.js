import asyncHandler from 'express-async-handler';
import Study from '../models/studyModel.js';
import moment from 'moment';
//Helper functions
const monthsStartingAtMiliseconds = (date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getTime();
};
function getNumberOfDaysInMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
}

const todaysStartingAtMiliseconds = (date = new Date()) => {
  return new Date(date.toDateString()).getTime();
};

export const createTarget = asyncHandler(async (req, res) => {
  const { userId, targetHour } = req.body;
  const data = await Study.create({ userId, targetHour });
  res.status(201).json(data);
});

export const updateTarget = asyncHandler(async (req, res) => {
  const { userId, targetHour } = req.body;
  const data = await Study.findOneAndUpdate(
    {
      userId,
      $and: [
        {
          createdAt: {
            $gte: new Date(todaysStartingAtMiliseconds()).toISOString(),
          },
        },
        {
          createdAt: {
            $lte: new Date(
              todaysStartingAtMiliseconds() + 86400000
            ).toISOString(),
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
export const updateCompleted = asyncHandler(async (req, res) => {
  const { userId, completed } = req.body;
  const data = await Study.findOneAndUpdate(
    {
      userId,
      $and: [
        { createdAt: { $gte: todaysStartingAtMiliseconds() } },
        { createdAt: { $lte: todaysStartingAtMiliseconds() + 86400000 } },
      ],
    },
    { completed },
    {
      new: true,
    }
  );
  res.json(data);
});
export const getTodaysData = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const data = await Study.findOne({
    userId,
    $and: [
      { createdAt: { $gte: todaysStartingAtMiliseconds() } },
      { createdAt: { $lte: todaysStartingAtMiliseconds() + 86400000 } },
    ],
  });
  res.json(data);
});
export const getMonthlyData = asyncHandler(async (req, res) => {
  let { userId } = req.params;
  let date;
  if (!date) date = new Date();
  const data = await Study.find({
    userId,
    $and: [
      { createdAt: { $gte: monthsStartingAtMiliseconds(new Date()) } },
      {
        createdAt: {
          $lte:
            monthsStartingAtMiliseconds(date) +
            86400000 * getNumberOfDaysInMonth(date),
        },
      },
    ],
  });
  res.json(data);
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
  })
  let hours = 0  
  data.forEach((obj=>  {
    hours += obj.completed; 
  })) 
  res.json({hours});
});
