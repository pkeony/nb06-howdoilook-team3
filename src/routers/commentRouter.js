import express from 'express';
import {
  createCommentController,
  updateCommentController,
  deleteCommentController
} from '../controllers/commentController.js';
import { withTryCatch } from '../lib/withTryCatch.js';

const router = express.Router();

// 답글 등록 (POST)
router.post('/curations/:curationId/comments', withTryCatch(createCommentController));

// 답글 수정 (PUT)
router.put('/comments/:commentId', withTryCatch(updateCommentController));

// 답글 삭제 (DELETE) ~
router.delete('/comments/:commentId', withTryCatch(deleteCommentController));

export default router;
