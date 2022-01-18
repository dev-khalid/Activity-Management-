import express from 'express';
import {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  addStudentActivity,
  basicConfig,
  // test,
} from '../controllers/studentActivityHandler.js';

const router = express.Router();

// router.get('/test', test);
router.route('/').post(createStudent).patch(updateStudent);
router.delete('/:studentId', deleteStudent);
router.get('/:month', getAllStudents);
//student er basic activity manage korbo
router.post('/basicconfig', basicConfig);
router.post('/studentactivity', addStudentActivity);
export default router;
