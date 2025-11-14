import { prisma } from '../lib/prismaClient.js';

// 답글 등록 서비스
export const createCommentService = async (content, password, curationId) => {
  if (!content || !password) {
    throw new Error('내용, 비밀번호를 모두 입력해야 합니다.');
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      password,
      curationId,
    },
  });

  return {
    id: newComment.id,
    nickname: newComment.user ? newComment.user.nickname : '익명',
    content: newComment.content,
    createdAt: newComment.createdAt.toISOString(),
  };
};

// 답글 수정 서비스
export const updateCommentService = async (id, content, password) => {
  if (!content || !password) {
    throw new Error('Missing required parameters: content and password');
  }

  if (isNaN(id)) {
    throw new Error('Invalid ID format, must be a number');
  }

  const existingComment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!existingComment) {
    throw new Error(`Comment with ID ${id} not found`);
  }

  if (existingComment.password !== password) {
    throw new Error('FORBIDDEN'); // 비밀번호가 일치하지 않으면 403 오류 발생
  }

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: { content },
  });

  return {
    id: updatedComment.id,
    nickname: updatedComment.nickname,
    content: updatedComment.content,
    createdAt: updatedComment.createdAt.toISOString(),
  };
};

// 답글 삭제 서비스
export const deleteCommentService = async (nickname, password) => {
  const existingComment = await prisma.comment.findUnique({
    where: { nickname },
  });

  await prisma.comment.delete({
    where: { nickname },
  });

  return console.log('답글이 삭제되었습니다.');
};

// 답글 목록 조회 서비스
export const getCommentService = async () => {
  return await prisma.comment.findMany();
};
