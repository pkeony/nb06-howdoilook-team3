import { back2front } from '../lib/category_conversion.js';
import { pageInfo } from '../lib/pageInfo.js';
import { save_thumbnail_imgUrl } from '../lib/save_thumbnail_imgUrl.js';
import { prisma } from '../lib/prismaClient.js';
import BadRequestError from '../lib/errors/BadRequestError.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

// 스타일 상세 조회
export async function getStyleService(styleId) {
  const backEnd_style = await prisma.style.findUniqueOrThrow({
    where: { id: parseInt(styleId) },
    select: {
      id: true,
      nickname: true,
      title: true,
      content: true,
      viewCount: true,
      curationCount: true,
      createdAt: true,
      categories: { select: { type: true, name: true, brand: true, price: true } },
      tags: true,
      imageUrls: true,
    },
  });
  if (!backEnd_style) {
    console.log(`0 style fetched`);
    throw new NotFoundError('Style', parseInt(styleId));
  }

  console.log('1 style fetched (detail)');
  const frontEnd_style = back2front(backEnd_style);
  return frontEnd_style;
}

// 스타일 목록 조회
export async function getStyleListService(reqQuery) {
  const { page = 1, pageSize = 10, sortBy = 'recent', searchBy, keyword, tag } = reqQuery;
  let orderBy;
  switch (sortBy) {
    case 'recent':
      orderBy = { createdAt: 'desc' };
      break;
    case 'mostViewed':
      orderBy = { viewCount: 'desc' };
      break;
    case 'mostCurated':
      orderBy = { curationCount: 'desc' };
      break;
    default:
      throw new BadRequestError('잘못된 요청입니다.');
  }

  let searchWhere;
  if (searchBy) {
    switch (searchBy) {
      case 'nickname':
        searchWhere = { nickname: { contains: keyword } };
        break;
      case 'title':
        searchWhere = { title: { contains: keyword } };
        break;
      case 'content':
        searchWhere = { content: { contains: keyword } };
        break;
      case 'tag':
        searchWhere = { tags: { has: keyword } };
        break;
      default:
        throw new BadRequestError('잘못된 요청입니다.');
    }
  } else {
    searchWhere = { undefined: undefined };
  }

  // const searchWhere = {
  //   nickname: { contains: keyword },
  //   title: { contains: keyword },
  //   content: { contains: keyword },
  //   tags: { has: keyword },
  //   undefined: undefined,
  // };

  // nStyles: 총 스타일 수
  const nStyles = await prisma.style.count({
    where: {
      ...searchWhere,
      ...(tag ? { tags: { has: tag } } : {}),
    },
  });

  const backEnd_styles = await prisma.style.findMany({
    where: {
      ...searchWhere,
      ...(tag ? { tags: { has: tag } } : {}),
    },
    //select: { _count: { select: { tags: tag } } }, // 작동 안함
    orderBy,
    select: {
      id: true,
      thumbnail: true,
      nickname: true,
      title: true,
      tags: true,
      categories: { select: { type: true, name: true, brand: true, price: true } },
      content: true,
      viewCount: true,
      curationCount: true,
      createdAt: true,
      updatedAt: false,
      password: false,
      imageUrls: true,
    },
    take: parseInt(pageSize),
    skip: (parseInt(page) - 1) * parseInt(pageSize),
  });

  if (!backEnd_styles.length) {
    console.log(`0 styles fetched`);
    throw new BadRequestError('잘못된 요청입니다.');
  }

  const stylesPaged = pageInfo(page, pageSize, save_thumbnail_imgUrl(backEnd_styles));
  console.log(`${backEnd_styles.length} styles fetched`);
  return stylesPaged;
}
