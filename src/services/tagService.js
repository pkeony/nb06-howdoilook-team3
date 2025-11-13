import { prisma } from '../lib/prismaClient.js';

// 인기 태그 조회
// nTags: 조회할 인기 태그 갯수 (default 3)
export async function getPopularTagsService(reqQuery) {
  const { n: nTags = 3 } = reqQuery;

  const styles = await prisma.style.findMany({
    select: { tags: true },
  });

  // 모든 태그를 한 배열로 병합하고 오름차순으로 정렬
  const allTagsSorted = combineAllTags(styles).sort();
  const result = getPopChart(allTagsSorted); // 인기는 태그 빈도
  console.log(result);

  const popChart = result.map((n) => n.tag); // 정렬된 순서대로 tag만 추출
  console.log(`인기태그 ${popChart.length}개 중 ${parseInt(nTags)}개 반환`);
  console.log('');
  return { tags: popChart.slice(0, parseInt(nTags)) };
}

//--------------------------------------- 사용된 함수들
function combineAllTags(styles) {
  let myTags = [];
  styles.map((n) => {
    myTags.push(...n.tags);
  });
  return myTags;
}

// 태그의 빈도수로 인기 결정
function getPopChart(allTagsSorted) {
  const freq = {};
  for (const t of allTagsSorted) freq[t] = (freq[t] || 0) + 1; // 각 태그 빈도 계산

  const result = Object.entries(freq)
    .map(([tag, count]) => ({ tag, count })) // { tag, count } 배열로 변환
    .sort((a, b) => b.count - a.count); // count 내림차순 정렬

  return result;
}
