
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addVideo, deleteVideo, getVideos, getVideo, likeVideo, addView } from '../controllers/video.js';

const router = Router();


router.post("/",verifyToken, addVideo);
router.get("/getVideos", getVideos);
router.get("/:id", verifyToken, getVideo)
router.delete("/deleteVideo/:id", verifyToken, deleteVideo);
router.put("/like/:id", verifyToken, likeVideo);
router.put("/view/:id", verifyToken, addView);

export default router;