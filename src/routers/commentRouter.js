// src/routers/reply.router.js
import express from 'express';
import {
  createReply,
  updateReply,
  deleteReply,
  getReplies,
} from '../controllers/comment.controller.js';
const router = express.Router();

// 답글 등록 (POST)
router.post('/', createReply);

// 답글 수정 (PUT)
router.put('/:nickname', updateReply);

// 답글 삭제 (DELETE)
router.delete('/:nickname', deleteReply);

// 답글 목록 조회 (GET)
router.get('/', getReplies);

export default router;
