import express from 'express';
import {
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudents,
  addStudentActivity,
  basicConfig,
  getStudentActivity,
  qualityFinder,
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
router.get('/studentactivity/:studentId/:month', getStudentActivity);
router.get('/quality/:studentId/:month', qualityFinder);
export default router;

//payment er jonne separate route thakbe somossa nai .
