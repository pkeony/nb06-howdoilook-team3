import { StructError } from 'superstruct';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import { Prisma } from '@prisma/client';

export function defaultNotFoundHandler(req, res, next) {
  return res.status(404).send({ message: '찾지 못했습니다.' });
}

export function globalErrorHandler(err, req, res, next) {
  if (err instanceof BadRequestError) {
    switch (err.name) {
      case 'BadRequestError':
        return res.status(400).send({ error: err.message || '요청이 유효하지 않습니다.' });
        break;
      default:
        return res.status(500).send({ message: '서버 내부 오류가 발생했습니다.' });
    }
  }

  if (err instanceof StructError) {
    //  비밀번호
    if (err.failures().some((f) => f.refinement === 'Password')) {
      return res.status(400).send({ message: '*영문, 숫자조합 8~16자리로 입력해주세요' });
    }

    // 닉네임 길이
    if (err.failures().some((f) => f.refinement === 'NicknameLength')) {
      return res.status(400).send({ message: '*20자 이내로 입력해주세요.' });
    }

    // 제목 길이
    if (err.failures().some((f) => f.refinement === 'TitleLength')) {
      return res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
    }

    // 스타일 내용 길이
    if (err.failures().some((f) => f.refinement === 'ContentLength')) {
      return res.status(400).send({ message: '*500자 이내로 입력해주세요.' });
    }

    // 태그 길이
    if (err.failures().some((f) => f.refinement === 'TagItemLength')) {
      return res.status(400).send({ message: '*20자 이내로 입력해주세요.' });
    }

    // 태그 개수
    if (err.failures().some((f) => f.refinement === 'TagsMax3')) {
      return res.status(400).send({ message: '*태그는 최대 3개까지 등록 가능합니다.' });
    }

    // 이미지 URL 필수 업로드
    if (err.failures().some((f) => f.refinement === 'UrlArrayMin')) {
      return res.status(400).send({ message: '*필수 입력사항입니다.' });
    }

    // 최소 카테고리 선택
    if (err.failures().some((f) => f.refinement === 'MinCategories')) {
      return res.status(400).send({ message: '*최소 하나 이상 선택해주세요.' });
    }

    // 카테고리 아이템 필드 검사 (이름/브랜드/가격)
    if (err.failures().some((f) => f.refinement === 'CategoryItemNameLength')) {
      return res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
    }

    if (err.failures().some((f) => f.refinement === 'CategoryItemBrandLength')) {
      return res.status(400).send({ message: '*30자 이내로 입력해주세요.' });
    }
    if (err.failures().some((f) => f.refinement === 'CategoryItemPriceRange')) {
      return res.status(400).send({ message: '*10억원 이하로 입력해주세요.' });
    }

    //숫자입력 오류
    if (err.failures().some((f) => f.type === 'number')) {
      return res.status(400).send({ message: '*0~10 사이의 숫자를 입력해주세요' });
    }
  }
  // 요청 데이터 형식이 스키마와 맞지 않을 경우 에러 메시지
  if (err instanceof StructError) {
    const firstFailure = err.failures()[0];
    if (firstFailure) {
      return res.status(400).send({ message: '잘못된 요청입니다' });
    } else {
      return res.status(400).send({ message: '*필수 입력사항입니다.' });
    }
  } else {
    return res.status(400).send({ message: '*필수 입력사항입니다.' });
  }

  if (err.message === 'FORBIDDEN') {
    res.status(403).send({ message: '비밀번호가 틀렸습니다' });
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
