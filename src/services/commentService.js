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
export const updateCommentService = async (nickname, content, password) => {
  const existingComment = await prisma.comment.findUnique({
    where: { nickname },
  });

  if (!existingComment) {
    throw new Error('답글을 찾을 수 없습니다.');
  }

  if (existingComment.password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  const updatedComment = await prisma.comment.update({
    where: { nickname },
    data: { content },
  });

  return console.log('답글이 수정되었습니다.');
};

// 답글 삭제 서비스
export const deleteCommentService = async (nickname, password) => {
  const existingComment = await prisma.comment.findUnique({
    where: { nickname },
  });

  if (!existingComment) {
    throw new Error('답글을 찾을 수 없습니다.');
  }

  if (existingComment.password !== password) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }

  await prisma.comment.delete({
    where: { nickname },
  });

  return console.log('답글이 삭제되었습니다.');
};

// 답글 목록 조회 서비스
export const getCommentService = async () => {
  return await prisma.comment.findMany();
};
