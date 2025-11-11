// src/controllers/reply.controller.js
import {
  createReplyService,
  updateReplyService,
  deleteReplyService,
  getRepliesService,
} from '../services/comment.service.js';

// 답글 등록
export const createReply = async (req, res) => {
  const { nickname, content, password } = req.body;
  try {
    const message = await createReplyService(nickname, content, password);
    res.status(201).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 답글 수정
export const updateReply = async (req, res) => {
  const { nickname } = req.params;
  const { content, password } = req.body;
  try {
    const message = await updateReplyService(nickname, content, password);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 답글 삭제
export const deleteReply = async (req, res) => {
  const { nickname } = req.params;
  const { password } = req.body;
  try {
    const message = await deleteReplyService(nickname, password);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 답글 목록 조회
export const getReplies = async (req, res) => {
  try {
    const replies = await getRepliesService();
    res.status(200).json({ comments: replies });
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};
