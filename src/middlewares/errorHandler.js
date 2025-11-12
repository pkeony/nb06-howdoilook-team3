import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { Prisma } from '@prisma/client';

export function defaultNotFoundHandler(req, res, next) {
  return res.status(404).send({ message: '찾지 못했습니다.' });
}

export function globalErrorHandler(err, req, res, next) {
  if (err instanceof StructError || err instanceof BadRequestError) {
    //  비밀번호
    if (err.failures().some((f) => f.refinement === 'Password')) {
      res.status(400).send({ message: '*영문, 숫자조합 8~16자리로 입력해주세요' });
      return;
    }

    // 닉네임 길이
    if (err.failures().some((f) => f.refinement === 'NicknameLength')) {
      res.status(400).send({ message: '*20자 이내로 입력해주세요.' });
      return;
    }

    // 제목 길이
    if (err.failures().some((f) => f.refinement === 'TitleLength')) {
      res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
      return;
    }

    // 스타일 내용 길이
    if (err.failures().some((f) => f.refinement === 'ContentLength')) {
      res.status(400).send({ message: '*500자 이내로 입력해주세요.' });
      return;
    }

    // 태그 길이
    if (err.failures().some((f) => f.refinement === 'TagItemLength')) {
      res.status(400).send({ message: '*20자 이내로 입력해주세요.' });
      return;
    }

    // 태그 개수
    if (err.failures().some((f) => f.refinement === 'TagsMax3')) {
      res.status(400).send({ message: '*태그는 최대 3개까지 등록 가능합니다.' });
      return;
    }

    // 이미지 URL 필수 업로드
    if (err.failures().some((f) => f.refinement === 'UrlArrayMin')) {
      res.status(400).send({ message: '*필수 입력사항입니다.' });
      return;
    }

    // 최소 카테고리 선택
    if (err.failures().some((f) => f.refinement === 'MinCategories')) {
      res.status(400).send({ message: '*최소 하나 이상 선택해주세요.' });
      return;
    }

    // 카테고리 아이템 필드 검사 (이름/브랜드/가격)
    if (err.failures().some((f) => f.refinement === 'CategoryItemNameLength')) {
      res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
      return;
    }
    if (err.failures().some((f) => f.refinement === 'CategoryItemBrandLength')) {
      res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
      return;
    }
    if (err.failures().some((f) => f.refinement === 'CategoryItemPriceRange')) {
      res.status(400).send({ message: '*10억원 이하로 입력해주세요.' });
      return;
    }

    // 요청 데이터 형식이 스키마와 맞지 않을 경우 에러 메시지
    if (err instanceof StructError) {
      const firstFailure = err.failures()[0];
      if (firstFailure) {
        // superstruct가 제공하는 기본 오류 메시지를 사용합니다.
        res.status(400).send({
          message: `*요청 형식이 올바르지 않습니다. (필드: ${
            firstFailure.path.join('.') || 'unknown'
          }, 이유: ${firstFailure.message})`,
        });
      } else {
        res.status(400).send({ message: '*필수 입력사항입니다.' });
      }
    } else {
      res.status(400).send({ message: '*필수 입력사항입니다.' });
    }
    return;
  }

  if (err.message === 'FORBIDDEN') {
    res.status(403).send({ message: '비밀번호가 일치하지 않습니다.' });
    return;
  }

  if (err.message === 'NOT_FOUND') {
    res.status(404).send({ message: '스타일을 찾을 수 없습니다.' });
    return;
  }

  // 스키마(Superstruct와 Prisma)가 서로 동기화되지 않았을 때 발생하는 실수를 잡는 에러
  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).send({ message: '잘못된 요청입니다.' });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).send({ message: '존재하지 않습니다.' });
      return;
    }
  }

  /** From express.json middleware */
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({ message: '올바르지 않은 형식입니다.' });
  }

  /** Application error */
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }

  /** Prisma error codes */
  if (err.code) {
    console.error(err);
    return res.status(500).send({ message: '서버 내부 오류가 발생했습니다.' });
  }

  console.error(err);
  return res.status(500).send({ message: 'Internal server error' });
}
