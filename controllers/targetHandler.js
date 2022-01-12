import asyncHandler from 'express-async-handler';
export const create = asyncHandler(async (req, res, next) => {
  const { title, userId, deadline, accomplished } = req.body;
  /**@TODO I have to code database functionality here  */
  res.status(201).json(rq.body); 
});
