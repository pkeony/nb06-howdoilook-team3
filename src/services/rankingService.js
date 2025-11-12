import { pageInfo } from '../lib/pageInfo.js';
import { prisma } from '../lib/prismaClient.js';
import { rankStylesBy } from '../lib/rankStylesBy.js';
import { save_thumbnail_imgUrl } from '../lib/save_thumbnail_imgUrl.js';

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
      imageUrls: true,
    },
  });

  if (!styles.length) {
    console.log(`0 styles fetched`);
    throw new Error('NOT_FOUND');
  }

  const temp = rankStylesBy(styles, rankBy); // rankBy로 styles 소팅하고, ranking & rating 필드 추가
  const rankedStyles = temp.map(({ curations, ...rest }) => rest); //  출력 양식에 맞추어 curations 필드 없앰

  // imageUrls[0]로 thumbnailm 필드 생성하고, imageUrls은 삭제
  const pagedRankedStyles = pageInfo(page, pageSize, save_thumbnail_imgUrl(rankedStyles));

  console.log(`${rankedStyles.length} styles ranked by ${rankBy}`);
  return pagedRankedStyles;
}
