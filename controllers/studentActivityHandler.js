import Student from '../models/studentModel.js';
import StudentActivity from '../models/studentActivityModel.js';
import asyncHandler from 'express-async-handler';
//percentage calculator
const percentageCalculator = (percentage, full, achieved) =>
  (10 * achieved) / full;

export const createStudent = asyncHandler(async (req, res) => {
  const data = await Student.create({ name: req.body.name });
  res.json(data);
});

export const getAllStudents = asyncHandler(async (req, res) => {
  //comeon ei functionality complete korte parlei 80% done
  //user just ekta date input dibe . seitake new date diye abar iso formate a kore nite hobe . 
  const userInputDate = new Date().toISOString(); 
  
});
export const updateStudent = asyncHandler(async (req, res) => {
  const data = await Student.findByIdAndUpdate(
    req.body.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  res.json(data);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  await Student.findByIdAndDelete(req.params.studentId);
  res.status(204);
});
