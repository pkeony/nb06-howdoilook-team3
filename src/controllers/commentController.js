import {
  createCommentService,
  updateCommentService,
  deleteCommentService
} from '../services/commentService.js';
import { assert } from 'superstruct';
import { CheckDeleteComment } from '../structs/structs.js';

// 답글 등록
export const createCommentController = async (req, res) => {
  const { curationId } = req.params;
  const { content, password } = req.body;
  const newCuration = await createCommentService(content, password, curationId);
  res.status(201).json(newCuration);
};

// 답글 수정
export const updateCommentController = async (req, res) => {
  const { commentId } = req.params;
  const { content, password } = req.body;
  const updateComment = await updateCommentService(commentId, content, password);
  res.status(200).json(updateComment);
};

// 답글 삭제~
export const deleteCommentController = async (req, res) => {
  assert(req.body, CheckDeleteComment);
  const { commentId } = req.params;
  const { password } = req.body;
  await deleteCommentService(commentId, password);
  res.status(200).json({ message: '답글 삭제 성공' });
};
