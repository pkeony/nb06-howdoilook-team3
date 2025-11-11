// src/services/reply.service.js
import { PrismaClient } from '@prisma/client'; // Prisma Client 임포트

const prisma = new PrismaClient();

// 답글 등록 서비스
export const createReplyService = async (nickname, content, password) => {
  if (!nickname || !content || !password) {
    throw new Error('닉네임, 내용, 비밀번호를 모두 입력해야 합니다.');
  }

  const newComment = await prisma.comment.create({
    data: {
      nickname,
      content,
      password,
    },
  });

  return '답글이 등록되었습니다.';
};

// 답글 수정 서비스
export const updateReplyService = async (nickname, content, password) => {
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

  return '답글이 수정되었습니다.';
};

// 답글 삭제 서비스
export const deleteReplyService = async (nickname, password) => {
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

  return '답글이 삭제되었습니다.';
};

// 답글 목록 조회 서비스
export const getRepliesService = async () => {
  return await prisma.comment.findMany();
};
