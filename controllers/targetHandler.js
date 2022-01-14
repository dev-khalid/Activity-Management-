import asyncHandler from 'express-async-handler';
import Target from '../models/targetModel.js';
export const createTarget = asyncHandler(async (req, res, next) => {
  const { title, userId, deadline, accomplished } = req.body;
  /**@TODO I have to code database functionality here  */
  const data = await Target.create({
    title,
    userId,
    deadline,
  });
  res.status(201).json(data);
});

export const updateTarget = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;
  let updateObject = {};
  if (req.body.title) {
    updateObject.title = req.body.title;
  }
  if (req.body.deadline) {
    updateObject.deadline = req.body.deadline;
  }
  if (req.body.accomplished) {
    updateObject.accomplished = req.body.accomplished;
  }
  //find by targetId and update
  const data = await Target.findByIdAndUpdate(_id, updateObject, { new: true });

  res.status(200).json(data);
});

export const deleteTarget = asyncHandler(async (req, res, next) => {
  const { _id } = req.body;
  const data = await Target.findByIdAndDelete(_id);
  res.status(204);
});

export const getTarget = asyncHandler(async (req, res, next) => {
  //ekhane limit use korte hobe and start at use korte hobe .

  const { page, userId } = req.params.page;

  const query = Target.find({ userId });
  const numberOfTarget = await Target.find({ userId })
    .skip(page - 1 * process.env.DOCUMENTS_PER_PAGE)
    .limit(process.env.DOCUMENTS_PER_PAGE)
    .countDocuments();

  // //first validate them
  // //10 documents per page .
  // if(numberOfTarget)
  if (numberOfTarget) {
    const data = await query
      .skip(page - 1 * process.env.DOCUMENTS_PER_PAGE)
      .limit(process.env.DOCUMENTS_PER_PAGE);
    res.status(200).json(data);
  } else {
    res.json({
      message: 'Empty',
    });
  }
});
