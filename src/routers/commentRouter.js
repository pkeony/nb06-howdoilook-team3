import express from 'express';
import {
  createCommentController,
  updateCommentController,
  deleteCommentController
} from '../controllers/commentController.js';

const router = express.Router();

// 답글 등록 (POST)
router.post('/curations/:curationId/comments', createCommentController);

// 답글 수정 (PUT)
router.put('/comments/:id', updateCommentController);

// 답글 삭제 (DELETE)
router.delete('/comments/:id', deleteCommentController);

export default router;
