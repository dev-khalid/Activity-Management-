import asyncHandler from 'express-async-handler';
import Target from '../models/targetModel.js';
const dateFormatter = (date) => new Date(date).toLocaleDateString();

export const allAchievements = asyncHandler(async (req, res, next) => {
  const { userId, page } = req.params;
  const data = await Target.find({ userId, accomplished: true })
    .skip((page - 1) * process.env.DOCUMENTS_PER_PAGE)
    .limit(process.env.DOCUMENTS_PER_PAGE)
    .select('-__v');
  res.status(200).json(data);
});

/**@TODO 100% functionality done here . but if i face any problem on frontend pagination implementation i will change the structue */
export const achievements =asyncHandler(async (req, res) => {
  const { page, userId } = req.params;
  console.log(req.query);
  let from = dateFormatter(req.query.from || new Date() - 86400000 * 30);
  let to = dateFormatter(req.query.to || new Date());
  console.log(from, to);
  let title = req.query.title || '';
  const data = await Target.find({
    userId,
    $and: [{ createdAt: { $gte: from } }, { createdAt: { $lte: to } }],
    $text: {
      $search: title,
      $caseSensitive: false,
    },
  })
    .skip((page - 1) * process.env.DOCUMENTS_PER_PAGE)
    .limit(process.env.DOCUMENTS_PER_PAGE);
  res.json(data);
});
