import express from 'express'; 
import {createTarget} from '../controllers/studyHandler.js'

const router = express.Router(); 

router.post('/',createTarget); 


export default router; 