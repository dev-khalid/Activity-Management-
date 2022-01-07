//eikhane amar model gular upore jehetu operation calayte hobe so ekhane amke model gulake import korte hobe .
//express-error-handler npm
//express-async-handler npm
import asyncHandler from 'express-async-handler';
import Study from '../models/studyModel.js';

export const createTarget = asyncHandler(async (req, res, next) => {
  const { userId, targetHour } = req.body;
  const data = await Study.create({ userId, targetHour });
  res.status(201).json(data);
});

export const updateTarget = asyncHandler(async(req, res, next) => {
  const { userId, targetHour } = req.body;
  const data = await Study.findOneAndUpdate(
    {  userId },
    { targetHour: targetHour },
    {
      new: true,
    }
  );
  res.json(data);
});
export const updateCompleted = asyncHandler(async(req, res, next) => {
  const { userId, completed } = req.body;
  const data = await Study.findOneAndUpdate(
    {  userId },
    { completed },
    {
      new: true,
    }
  );
  res.json(data);
});

export const getTodaysData = asyncHandler(async(req,res,next)=> {
  const {userId} = req.body;
  const data = await Study.find({userId,
    // {
    //   //something is greater then and less then today's time stamp currnet time take basically check dite hobe eikhane 
    // }
  })
  res.json(data);
})
