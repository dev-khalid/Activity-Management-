import express from 'express'; 
import {createTarget, getMonthlyData, getTodaysData, updateCompleted, updateTarget} from '../controllers/studyHandler.js'

const router = express.Router(); 

router.post('/',createTarget); 
router.patch('/target',updateTarget); 
router.patch('/completed',updateCompleted); 
router.get('/todaysdata/:userId',getTodaysData); 
router.get('/monthlydata/:userId',getMonthlyData); 



export default router; 