
import { Router } from 'express';
import { verifyToken } from '../middleware/auth.js';
import { addComment } from '../controllers/comment.js';
import multer from 'multer';
import fluentFfmpeg from 'fluent-ffmpeg';

const router = Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      if (ext !== '.mp4') {
          return cb(res.status(400).end('Only MP4 is supported'), false);
      }
      cb(null, true)
  }
})

const upload = multer({ storage: storage }).single("file");







router.post("/:id/addComment", addComment);

export default router;