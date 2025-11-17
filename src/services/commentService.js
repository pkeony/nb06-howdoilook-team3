import { assert } from 'superstruct';
import { prisma } from '../lib/prismaClient.js';
import { CheckComment } from '../structs/structs.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

// 답글 등록 서비스
export const createCommentService = async (content, password, curationId) => {
  // 큐레이션 아이디 -> 스타일 아이디 찾기
  const curation = await prisma.curation.findUnique({
    where: { id: Number(curationId) }
  });

  // 스타일 아이디 -> 스타일 패스워드 찾기
  const { stylesId } = curation;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  // 스타일 객체 -> 스타일 패스워드 찾고 오류 잡기
  const { password: newPassword } = style;
  if (password !== newPassword) {
    throw new Error('FORBIDDEN');
  }
  const data = {
    content,
    password
  };
  // superstruct import
  assert(data, CheckComment);

  // 스타일 패스워드 일치할 때 내용 등록
  const newCuration = await prisma.curation.update({
    where: { id: Number(curationId) },
    data: { comment: { create: data } }
  });

  // 결과 출력
  return newCuration;
};

// 답글 수정 서비스
export const updateCommentService = async (commentId, content, password) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });

  const { curationId } = comment;
  const curation = await prisma.curation.findUnique({
    where: { id: Number(curationId) }
  });

  const { stylesId } = curation;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  // 스타일 객체 -> 스타일 패스워드 찾고 오류 잡기
  const { password: newPassword } = style;
  if (password !== newPassword) {
    throw new Error('FORBIDDEN');
  }
  const data = {
    content,
    password
  };

  assert(data, CheckComment);
  //코멘트 고치기
  const updateComment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data
  });

  return updateComment;
};

// 답글 삭제 서비스
export const deleteCommentService = async (commentId, password) => {
  const deletecomment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });

  if (!deletecomment) {
    throw new Error('Comment not found');
  }

  const { curationId } = deletecomment;
  const deletecuration = await prisma.curation.findUnique({
    where: { id: Number(curationId) }
  });

  if (!deletecuration) {
    throw new Error('Curation not found');
  }

  const { stylesId } = deletecuration;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  if (!style) {
    throw new Error('Style not found');
  }

  // 2. 비밀번호 일치 확인
  const { password: newPassword } = style;
  if (password !== newPassword) {
    throw new Error('FORBIDDEN');
  }

  // 3. 코멘트 삭제
  await prisma.comment.delete({
    where: {
      id: Number(commentId)
    }
  });

  return;
};

// 답글 목록 조회 서비스
export const getCommentService = async () => {
  return await prisma.comment.findMany();
};
