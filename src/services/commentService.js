import { assert, integer } from 'superstruct';
import { prisma } from '../lib/prismaClient.js';
import { CheckComment } from '../structs/structs.js';

// 답글 등록 서비스
export const createCommentService = async (content, password, curationId) => {
  // 큐레이션 아이디 -> 스타일 아이디 찾기
  console.log(curationId);
  const curation = await prisma.curation.findUnique({
    where: { id: Number(curationId) }
  });
  console.log(curation);
  // 스타일 아이디 -> 스타일 패스워드 찾기
  const { stylesId } = curation;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  // 스타일 객체 -> 스타일 패스워드 찾고 오류 잡기
  const { password: newPassword } = style;
  console.log(password, newPassword);
  if (password !== newPassword) {
    throw new Error('FORBIDDEN');
  }
  const data = {
    // curationId: Number(curationId),
    content,
    password
  };
  assert(data, CheckComment);

  // 스타일 패스워드 일치할 때 내용 등록
  const newCuration = await prisma.curation.update({
    where: { id: Number(curationId) },
    data: { comment: { create: data } }
  });
  // const newComment = await prisma.comment.create({
  //   data: {
  //    content,
  //     password,
  //     curationId
  //   }
  // });

  // return {
  //   id: newComment.id,
  //   nickname: newComment.nickname,
  //   content: newComment.content,
  //   createdAt: newComment.createdAt.toISOString()
  // };
  return newCuration;
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
    where: { id }
  });

  if (!existingComment) {
    throw new Error(`Comment with ID ${id} not found`);
  }

  if (existingComment.password !== password) {
    throw new Error('FORBIDDEN'); // 비밀번호가 일치하지 않으면 403 오류 발생
  }

  const updatedComment = await prisma.comment.update({
    where: { id },
    data: {
      content
    }
  });

  return {
    id: updatedComment.id,
    nickname: updatedComment.nickname,
    content: updatedComment.content,
    createdAt: updatedComment.createdAt.toISOString()
  };
};

// 답글 삭제 서비스
export const deleteCommentService = async (nickname, password) => {
  const existingComment = await prisma.comment.findUnique({
    where: { nickname }
  });

  await prisma.comment.delete({
    where: { nickname }
  });

  return console.log('답글이 삭제되었습니다.');
};

// 답글 목록 조회 서비스
export const getCommentService = async () => {
  return await prisma.comment.findMany();
};
