import express from 'express';
const router = express.Router();

router.route('/').post().patch();

export default router;
