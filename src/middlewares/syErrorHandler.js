import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { Prisma } from '@prisma/client';

export function defaultNotFoundHandler(req, res, next) {
  return res.status(404).send({ message: '요청하신 페이지를 찾을 수 없습니다.' });
}

export function globalErrorHandler(err, req, res, next) {
  console.error(err); // 개발용 로그

  // Superstruct 에러 처리
  if (err instanceof StructError) {
    const failures = typeof err.failures === 'function' ? err.failures() : [];
    const firstFailure = failures.length > 0 ? failures[0] : null;

    if (firstFailure && firstFailure.message && firstFailure.refinement) {
      return res.status(400).send({ message: firstFailure.message });
    }

    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  // 서비스 계층에서 던진 BadRequestError 처리
  if (err instanceof BadRequestError) {
    return res.status(400).send({
      message: err.message || '잘못된 요청입니다.',
    });
  }

  // 403 Forbidden (비밀번호 오류)
  if (err.message === 'FORBIDDEN') {
    return res.status(403).send({
      message: '비밀번호가 틀렸습니다.',
    });
  }

  // NotFoundError (서비스 계층에서 던진 404)
  if (err instanceof NotFoundError || err.message === 'NOT_FOUND') {
    return res.status(404).send({
      message: err.message || '존재하지 않습니다.',
    });
  }

  // Prisma 관련 오류 처리
  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).send({ message: '존재하지 않습니다.' });
    }
    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  // JSON 파싱 오류
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: '잘못된 요청입니다.' });
  }

  // 기타 알 수 없는 오류: 지금까지 에러가 안 걸러졌다면, 반드시 여기서 걸리게.
  return res.status(500).send({
    message: 'Internal server error',
  });
}
