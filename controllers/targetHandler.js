import asyncHandler from 'express-async-handler';
import Target from '../models/targetModel.js';
import moment from 'moment';

export const createTarget = asyncHandler(async (req, res, next) => {
  let { title, userId, deadline } = req.body;
  deadline = moment(deadline).utcOffset('+6:00').format();
  const data = await Target.create({
    title,
    userId,
    deadline,
  });
  res.status(201).json(data);
});

/**
 * @ROUTE - patch - /api/target/createtask
 * @Request - body - {task,deadline,targetId,userId}
 */
export const createTask = asyncHandler(async (req, res) => {
  let { task, deadline, targetId, userId } = req.body;
  deadline = moment(deadline || new Date())
    .add(6, 'hours')
    .format();
  //need to merge the deadline
  const target = await Target.findOne({
    _id: targetId,
    userId,
  });
  if (deadline > target.deadline) {
    const finalDeadline = deadline;
    target.deadline = finalDeadline;
  }
  //now need to push into target.tasks
  target.tasks.push({
    task,
    deadline,
  });
  target.save();
  res.json(target);
});

/**
 * @ROUTE - patch - /api/target/updateTask
 * @Request - body {taskId,targetId,done,task,deadline}
 */
export const updateTask = asyncHandler(async (req, res) => {
  const { taskId, targetId, deadline, taskName, done } = req.body;
  const target = await Target.findOne({
    _id: targetId,
  });
  target.tasks.forEach((task) => {
    if (task._id.toString() === taskId) {
      if (deadline) task.deadline = moment(deadline).add(6, 'hours').format();
      if (done != undefined || done != null) task.done = done;
      if (taskName) task.task = taskName;
    }
  });
  target.save();
  res.json(target);
});
/**
 * @ROUTE - delete - /api/target/removetask
 * @Request - body {taskId,targetId}
 */
export const removeTask = asyncHandler(async (req, res) => {
  const { taskId, targetId } = req.body;
  const target = await Target.findById(targetId);
  target.tasks = target?.tasks?.filter((task) => task._id.toString() != taskId);
  target.save();
  res.json(target);
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
    .sort('deadline');
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
