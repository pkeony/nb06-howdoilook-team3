import { back2front } from './catetory_conversion.js';
import { pageInfo } from './pageInfo.js';
import { prisma } from '../lib/prismaClient.js';

// 스타일 상세 조회
export async function getStyleService(styleId) {
  const backEnd_syle = await prisma.style.findUniqueOrThrow({
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

  console.log('1 style fetched (detail)');
  const { categories: backEnd_categories, tags, imageUrls, ...rest } = backEnd_syle;
  const categories = back2front(backEnd_categories);
  const frontEnd_Style = { ...rest, categories, tags, imageUrls };
  return frontEnd_Style;
}

// 스타일 목록 조회
export async function getStyleListService(reqQuery) {
  const { page = 1, pageSize = 10, sortBy = 'recent', searchBy, keyword, tag } = reqQuery;
  let orderBy;
  switch (sortBy) {
    case 'recent':
      orderBy = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'mostViewed':
      orderBy = { viewCount: 'desc' };
      break;
    case 'mostCurated':
      orderBy = { curationCount: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  let searchWhere;
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
      imageUrls: false,
    },
    take: parseInt(pageSize),
    skip: (parseInt(page) - 1) * parseInt(pageSize),
  });

  if (!backEnd_styles.length) {
    console.log(`0 styles fetched`);
    throw new Error('NOT_FOUND');
  }

  // const { categories: backEnd_categories, ...rest } = backEnd_styles;
  // const categories = back2front(backEnd_categories);
  // const frontEnd_styles = { ...rest, categories };
  const myPage = pageInfo(page, pageSize, nStyles);
  const stylesPaged = {
    currentPage: myPage.currPage,
    totalPage: myPage.totalPage,
    totalItemCount: myPage.totalItemCount,
    data: backEnd_styles,
  };
  console.log(`${backEnd_styles.length} styles fetched`);
  return stylesPaged;
}
