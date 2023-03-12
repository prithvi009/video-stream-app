import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {addComment, deleteComment, getComments} from "../controllers/comment.js"
const router = Router();

router.post("/:id", verifyToken, addComment);
router.delete("/deleteComment/:id", verifyToken, deleteComment);
router.get("/:videoId", getComments);
 


export default router;