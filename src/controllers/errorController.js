import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { Prisma } from '@prisma/client';

export function defaultNotFoundHandler(req, res, next) {
  return res.status(404).send({ message: '찾지 못했습니다.' });
}

export function globalErrorHandler(err, req, res, next) {
  /** From superstruct or application error */
  if (err instanceof StructError || err instanceof BadRequestError) {
    if (err.failures().some((f) => f.refinement === 'Password')) {
      res.status(400).send({ message: '*영문, 숫자조합 8~16자리로 입력해주세요' });
    } else if (err.failures().some((f) => f.refinement === 'MinCategories')) {
      res.status(400).send({ message: '*최소 하나 이상 선택해주세요' });
    } else {
      res.status(400).send({ message: '*필수 입력사항입니다.' });
    }
  }
  if (err.message === 'FORBIDDEN') {
    res.status(403).send({ message: '비밀번호가 일치하지 않습니다.' });
    return;
  }

  if (err.message === 'NOT_FOUND') {
    res.status(404).send({ message: '스타일을 찾을 수 없습니다.' });
    return;
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).send({ message: '잘못된 요청입니다.' });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2025') {
      res.status(404).send({ message: '존재하지 않습니다.' });
      return;
    }
  }

  /** From express.json middleware */
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: '올바르지 않은 형식입니다.' });
  }

  /** Prisma error codes */
  if (err.code) {
    console.error(err);
    return res.status(500).send({ message: '서버 내부 오류가 발생했습니다.' });
  }

  /** Application error */
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }

  console.error(err);
  return res.status(500).send({ message: 'Internal server error' });
}
