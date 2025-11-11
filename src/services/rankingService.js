import { back2front } from './catetory_conversion.js';
import { pageInfo } from './pageInfo.js';
import { prisma } from '../lib/prismaClient.js';

// 스타일 랭킹 조회
export async function getStyleRankingListService(reqQuery) {
  const { page = 1, pageSize = 10, rankBy: rankBy } = reqQuery;

  const styles = await prisma.style.findMany({
    include: {
      curations: true,
    },
  });

  const ranked = styles.map((style) => {
    const curations = style.curations;
    const n = curations.length || 1;
    const avg = {
      trendy: curations.reduce((a, c) => a + c.trendy, 0) / n,
      personality: curations.reduce((a, c) => a + c.personality, 0) / n,
      practicality: curations.reduce((a, c) => a + c.practicality, 0) / n,
      costEffectiveness: curations.reduce((a, c) => a + c.costEffectiveness, 0) / n,
    };
    avg((s) => {
      s.total = (s.trendy + s.personality + s.practicality + s.costEffectiveness) / 4;
    });

    const avgTotal = (avg.trendy + avg.personality + avg.practicality + avg.costEffectiveness) / 4;
    return { ...style, avg, avgTotal };
  });

  let orderBy;
  switch (rankBy) {
    case 'trendy':
      orderBy = { curations: { _avg: { trendy: 'desc' } } };
      break;
    case 'personality':
      orderBy = { curations: { _avg: { personality: 'desc' } } };
      break;
    case 'practicality':
      orderBy = { curations: { _avg: { practicality: 'desc' } } };
      break;
    case 'costEffectiveness':
      orderBy = { curations: { _avg: { costEffectiveness: 'desc' } } };
      break;
    default:
      orderBy = { createdAt: 'desc' }; // 기본 정렬
  }

  // nStyles: 총 스타일 수
  const nStyles = await prisma.style.count();

  const backEnd_styles = await prisma.style.aggregate({
    orderBy,
    skip: (parseInt(page) - 1) * parseInt(pageSize),
    take: parseInt(pageSize),
    select: {
      id: true,
      thumbnail: true,
      nickname: true,
      tags: true,
      viewCount: true,
      curationCount: true,
      createdAt: true,
      curations: {
        select: {
          trendy: true,
          personality: true,
          practicality: true,
          costEffectiveness: true, // ✅ 오타 수정
        },
      },
      categories: {
        select: {
          type: true,
          name: true,
          brand: true,
          price: true,
        },
      },
    },
  });

  if (!backEnd_styles.length) {
    console.log(`0 styles fetched`);
    throw new Error('NOT_FOUND');
  }
  // const myPage = pageInfo(page, pageSize, nStyles);
  // const stylesPaged = {
  //   currentPage: myPage.currPage,
  //   totalPage: myPage.totalPage,
  //   totalItemCount: myPage.totalItemCount,
  //   data: backEnd_styles,
  // };
  console.log(`${backEnd_styles.length} styles fetched`);
  return backEnd_styles;
}
