import { prisma } from '../lib/prismaClient.js';

// 인기 태그 조회
// nTags: 조회할 인기 태그 갯수 (default 3)
export async function getPopularTagsService(reqQuery) {
  const { n: nTags = 3 } = reqQuery;

  const styles = await prisma.style.findMany({
    select: { tags: true },
  });

  // 모든 태그를 한 배열로 병합하고 정렬
  const allTagsSorted = combineAllTags(styles).sort();

  //const popChart = getPopChart1(allTagsSorted); // 인기(1): 태그 빈도
  const popChart = getPopChart2(allTagsSorted, 3); // 인기(2): 각 태그 안의 연이은 몇 글자의 빈도

  console.log(`태그 순위 (총 ${popChart.length}개)`);
  console.log(popChart);
  console.log('');
  return { tags: popChart.slice(0, parseInt(nTags)) };
}

function combineAllTags(styles) {
  let myTags = [];
  styles.map((n) => {
    myTags.push(...n.tags);
  });
  return myTags;
}

function getPopChart1(allTagsSorted) {
  const freq = {};
  for (const t of allTagsSorted) freq[t] = (freq[t] || 0) + 1;

  const uniqueTags = Object.keys(freq); // 중복 제거된 태그들
  const counts = uniqueTags.map((t) => freq[t]); // 각 태그의 개수

  // 결과 객체 배열 형태로 반환할 수도 있음
  const result = uniqueTags.map((t, i) => ({ tag: t, count: counts[i] }));
  console.log(result);
  return uniqueTags;
}

function getPopChart2(allTagsSorted, sizeUnitStr = 2) {
  const substringMap = {}; // substring -> Set(포함된 태그 인덱스)

  // 각 태그에서 substring 추출해서 맵에 저장
  allTagsSorted.forEach((tag, index) => {
    const seen = new Set(); // 한 태그 내 substring 중복 방지
    for (let j = 0; j < tag.length - sizeUnitStr + 1; j++) {
      const sub = tag.slice(j, j + sizeUnitStr);
      if (seen.has(sub)) continue;
      seen.add(sub);
      if (!substringMap[sub]) substringMap[sub] = new Set();
      substringMap[sub].add(index);
    }
  });

  // substring별 등장 태그 수 계산
  const pop = Object.entries(substringMap).map(([str, set]) => ({
    str,
    count: set.size,
  }));

  // count 기준 내림차순 정렬
  const sortedPop = pop.sort((a, b) => b.count - a.count);

  // substring이 속한 태그 인덱스 모으기 (중복 제거)
  const popIndexCondensed = [
    ...new Set(sortedPop.flatMap(({ str }) => Array.from(substringMap[str]))),
  ];

  // 인기 태그 목록 생성 (index → tag)
  const popChart = popIndexCondensed.map((i) => allTagsSorted[i]);

  // 문자열 기준으로 중복 제거 (최종 단계)
  const popChartUnique = [...new Set(popChart)];

  return popChartUnique;
}
