import asyncHandler from 'express-async-handler';
import Target from '../models/targetModel.js';
export const createTarget = asyncHandler(async (req, res, next) => {
  const { title, userId, deadline } = req.body;
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
  await Target.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export const getTarget = asyncHandler(async (req, res, next) => {
  const { page, userId } = req.params;
  const data = await Target.find({ userId, accomplished: false })
    .skip((page - 1) * process.env.DOCUMENTS_PER_PAGE)
    .limit(process.env.DOCUMENTS_PER_PAGE)
    .sort('deadline')
    ;
  res.status(200).json(data);
});

export const getAllTargets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { accomplished } = req.query;
  const data = await Target.find({
    userId,
    accomplished,
  }).countDocuments();
  res.json(data);
});
