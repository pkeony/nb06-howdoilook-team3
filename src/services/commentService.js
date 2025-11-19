import { assert } from 'superstruct';
import { prisma } from '../lib/prismaClient.js';
import { CheckComment } from '../structs/structs.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

// 답글 등록 서비스
export const createCommentService = async (content, password, curationId) => {
  // 큐레이션 아이디 -> 스타일 아이디 찾기
  const curation = await prisma.curation.findUnique({
    where: { id: Number(curationId) },
    include: { comment: true }
  });

  if (!curation) {
    throw new NotFoundError('Curation', curationId);
  }

  if (curation.comment) {
    const error = new Error('P2002');
    error.code = 'P2002';
    throw error;
  }

  // 스타일 아이디 -> 스타일 패스워드 찾기
  const { stylesId } = curation;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  if (!style) {
    throw new NotFoundError('style', stylesId);
  }

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
  const newComment = await prisma.comment.create({
    data: {
      content: data.content,
      password: data.password,
      curationId: Number(curationId)
    }
  });

  return {
    id: newComment.id,
    nickname: style.nickname,
    content: newComment.content,
    createdAt: newComment.createdAt
  };
};

// 답글 수정 서비스
export const updateCommentService = async (commentId, content, stylePassword) => {
  const comment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });
  if (!comment) throw new NotFoundError('Comment', commentId);

  const curation = await prisma.curation.findUnique({
    where: { id: Number(comment.curationId) } // comment에서 가져오기 안전
  });
  if (!curation) throw new NotFoundError('Curation', comment.curationId);

  const style = await prisma.style.findUnique({
    where: { id: Number(curation.stylesId) }
  });
  if (!style) throw new NotFoundError('Style', curation.stylesId);

  if (stylePassword == null) {
    throw new BadRequestError('비밀번호가 필요합니다.');
  }

  if (stylePassword !== style.password) {
    throw new Error('FORBIDDEN');
  }

  const data = {
    content,
    password: stylePassword // ← 중요: key는 'password'여야 함
  };

  assert(data, CheckComment);

  const updateComment = await prisma.comment.update({
    where: { id: Number(commentId) },
    data
  });

  const { updatedAt, password, curationId, ...rest } = updateComment;

  return {
    ...rest,
    stylesId: curation.stylesId // rest 뒤에 추가 (우선순위: 명시된 필드가 덮어씀)
  };
};

// 답글 삭제 서비스 ~
export const deleteCommentService = async (commentId, password) => {
  const deleteComment = await prisma.comment.findUnique({
    where: { id: Number(commentId) }
  });

  if (!deleteComment) {
    throw new NotFoundError('Comment', Number(commentId));
  }

  const { curationId } = deleteComment;
  const deleteCuration = await prisma.curation.findUnique({
    where: { id: Number(curationId) }
  });

  if (!deleteCuration) {
    throw new NotFoundError('Curation', Number(curationId));
  }

  const { stylesId } = deleteCuration;
  const style = await prisma.style.findUnique({
    where: { id: Number(stylesId) }
  });

  if (!style) {
    throw new NotFoundError('Style', Number(stylesId));
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
// export const getCommentService = async () => {
//   return await prisma.comment.findMany();
// };
