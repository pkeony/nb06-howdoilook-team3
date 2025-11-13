import { getPopularTagsService } from '../services/tagService.js';

// 인기 태그 조회
// n: 조회하고 싶은 인기 태그 갯수
export async function getPopularTags(req, res) {
  const popTagChart = await getPopularTagsService(req.query);
  res.status(200).send(popTagChart);
}
