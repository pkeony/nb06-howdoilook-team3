import express from 'express';
import { createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// 답글 등록 (POST)
router.post('/curations/:id/comments', createComment);

// 답글 수정 (PUT)
router.put('/comments/:id', updateComment);

// 답글 삭제 (DELETE)
router.delete('/comments/:id', deleteComment);

export default router;
