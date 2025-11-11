export function rankStylesBy(styles, rankBy = 'total') {
  // 각 스타일 curation 평균 계산 - total/trendy/personality/practicality/costEffectiveness
  const ranked = styles.map((style) => {
    const { id, curations } = style;
    const nCurations = curations.length;

    let avg;
    if (nCurations > 0) {
      // curation이 하나라도 있는 경우
      avg = {
        rankby: curations.reduce((a, c) => a + c.trendy, 0) / nCurations,
        personality: curations.reduce((a, c) => a + c.personality, 0) / nCurations,
        practicality: curations.reduce((a, c) => a + c.practicality, 0) / nCurations,
        costEffectiveness: curations.reduce((a, c) => a + c.costEffectiveness, 0) / nCurations,
      };
      avg.total = (avg.trendy + avg.personality + avg.practicality + avg.costEffectiveness) / 4;
    } else {
      // curation이 없는 경우 undefined (0으로 하면 전체 평균을 깍아 내림)
      avg = {
        trendy: undefined,
        personality: undefined,
        practicality: undefined,
        costEffectiveness: undefined,
        total: undefined,
      };
    }
    style.ranking = undefined; // 출력 순서를 맞추기 위해 자리를 미리 만들어 줌
    style.rating = avg[rankBy]; //rankBy에 해당하는 rating 넣어줌

    return style;
  });

  // rating 내림차순으로 id 정렬하고
  const sortedIds = styles.sort((a, b) => b.rating - a.rating).map((style) => style.id);

  // ranking = index+1로 슨위 mapping
  styles.map((n, ind) => (n.ranking = ind + 1)); // 원배열 순서 바꿈

  return styles;
}
