import {
  createCommentService,
  updateCommentService,
  deleteCommentService,
} from '../services/commentService.js';
import { globalErrorHandler } from '../middlewares/errorHandler.js';

// 답글 등록
export const createCommentController = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { content, password } = req.body;
    const newComment = await createCommentService(content, password, id);
    res.status(201).json(newComment);
  } catch (error) {
    globalErrorHandler(error, req, res);
  }
};

// 답글 수정
export const updateCommentController = async (req, res) => {
  const { id } = req.params;
  const { content, password } = req.body;

  console.log('Received request body:', req.body);
  console.log('Received ID from URL:', id);

  try {
    const updatedComment = await updateCommentService(Number(id), content, password);
    res.status(200).json(updatedComment);
  } catch (error) {
    globalErrorHandler(error, req, res);
  }
};

// 답글 삭제
export const deleteCommentController = (req, res) => {
  const { nickname } = req.params;
  const { password } = req.body;
  const message = deleteCommentService(nickname, password);
  res.status(200).json({ message: '답글 삭제 성공' });
};
