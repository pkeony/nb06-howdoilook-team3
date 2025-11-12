import { prisma } from '../lib/prismaClient.js';

// 스타일 상세 조회
export async function getPopularTags(nTags) {
  const styles = await prisma.style.findMany({
    select: { tags: true },
  });

  const allTags = console.log('1 style fetched (detail)');
  return popTags.slice(0, parseInt(nTags) - 1);
}
