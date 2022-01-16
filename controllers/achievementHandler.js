import asyncHandler from 'express-async-handler';
import Target from '../models/targetModel.js';
const dateFormatter = (date) => new Date(date).toISOString();

export const allAchievements = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const data = await Target.find({
    userId,
    accomplished: true,
  }).countDocuments();

  res.json(data);
});

export const achievements = asyncHandler(async (req, res) => {
  const { page, userId } = req.params;
  let from = dateFormatter(req.query.from || new Date() - 86400000 * 30); //yyyy-mm-dd.
  let to = dateFormatter(req.query.to || new Date());
  let title = req.query.title || '';
  const data = await Target.find({
    userId,
    $and: [{ updatedAt: { $gte: from } }, { updatedAt: { $lte: to } }],
    title: { $regex: title, $options: 'i' },
    accomplished: true,
  })
    .skip((page - 1) * process.env.DOCUMENTS_PER_PAGE)
    .limit(process.env.DOCUMENTS_PER_PAGE);
  res.json(data);
});
