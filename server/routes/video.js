
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addVideo, deleteVideo, getVideos, getVideo } from '../controllers/Video.js';

const router = Router();


router.post("/",verifyToken, addVideo);
router.get("/getVideos", getVideos);
router.get("/:id", verifyToken, getVideo)
router.delete("/deleteVideo/:id", verifyToken, deleteVideo);

export default router;