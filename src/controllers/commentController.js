import {
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from '../services/commentService.js';
import { globalErrorHandler } from '../middlewares/errorHandler.js';

// 답글 등록
export const createComment = (req, res) => {
  const { nickname, content, password } = req.body;
  const message = createCommentService(nickname, content, password);
  if (!curation) {
    throw new globalErrorHandler('curation', id);
  }
  res.status(201).json({ message });
};

// 답글 수정
export const updateComment = (req, res) => {
  const { nickname } = req.params;
  const { content, password } = req.body;
  const message = updateCommentService(nickname, content, password);
  if (!curation) {
    throw new globalErrorHandler('curation', id);
  }
  res.status(200).json({ message });
};

// 답글 삭제
export const deleteComment = (req, res) => {
  const { nickname } = req.params;
  const { password } = req.body;
  const message = deleteCommentService(nickname, password);
  if (!curation) {
    throw new globalErrorHandler('curation', id);
  }
  res.status(200).json({ message });
};
