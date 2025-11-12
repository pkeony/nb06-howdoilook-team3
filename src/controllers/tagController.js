import { getPopularTagService } from '../services/tagService.js';

// 인기 태그 조회
// n: 조회하고 싶은 인기 태그 갯수
export async function getStyle(req, res) {
  const { n: nTags } = req.query;
  const tagsFound = await getPopularTagService(nTags);
  res.status(200).send(tagsFound);
}
