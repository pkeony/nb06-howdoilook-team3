import { getStyleRankingListService } from '../services/rankingService.js';

// 스타일 랭킹 조회
export async function getStyleRankingList(req, res) {
  const stylesFetched = await getStyleRankingListService(req.query);
  res.status(200).send(stylesFetched);
}
