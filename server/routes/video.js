
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addVideo, deleteVideo } from '../controllers/Video.js';

const router = Router();


router.post("/",verifyToken, addVideo);
router.delete("/deleteVideo/:id", verifyToken, deleteVideo);

export default router;