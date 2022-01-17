import express from 'express';
import {
  createStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentActivityHandler.js';

const router = express.Router();

//student name add korbo .
router.route('/').post(createStudent).patch(updateStudent);
router.delete('/:studentId', deleteStudent);

//student er basic activity manage korbo

export default router;
