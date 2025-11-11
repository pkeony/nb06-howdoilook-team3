import { back2front } from '../lib/catetory_conversion.js';
import { pageInfo } from '../lib/pageInfo.js';
import { prisma } from '../lib/prismaClient.js';
import { rankStylesBy } from '../lib/rankStylesBy.js';

// 스타일 랭킹 조회
export async function getStyleRankingListService(reqQuery) {
  const { page = 1, pageSize = 10, rankBy = 'total' } = reqQuery;

  const styles = await prisma.style.findMany({
    select: {
      id: true,
      thumbnail: true,
      nickname: true,
      title: true,
      tags: true,
      categories: {
        select: {
          type: true,
          name: true,
          brand: true,
          price: true,
        },
      },
      viewCount: true,
      curationCount: true,
      createdAt: true,
      curations: {
        select: {
          trendy: true,
          personality: true,
          practicality: true,
          costEffectiveness: true,
        },
      },
    },
  });

  if (!styles.length) {
    console.log(`0 styles fetched`);
    throw new Error('NOT_FOUND');
  }

  const temp = rankStylesBy(styles, rankBy); // rankBy로 styles 소팅하고, ranking & rating 필드 추가
  const rankedStyles = temp.map(({ curations, ...rest }) => rest); //  출력 양식에 맞추어 curations 필드 없앰

  const myPage = pageInfo(page, pageSize, styles.length);
  const rankedStylesPaged = {
    currentPage: myPage.currPage,
    totalPage: myPage.totalPage,
    totalItemCount: myPage.totalItemCount,
    data: rankedStyles,
  };
  console.log(`${rankedStyles.length} styles ranked by ${rankBy}`);
  return rankedStylesPaged;
}
