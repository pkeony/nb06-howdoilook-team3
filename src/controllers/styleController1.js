import { getStyleService, getStyleListService } from '../services/styleService1.js';

// 스타일 상세 조회
export async function getStyle(req, res) {
  const { styleId } = req.params;
  const styleFetched = await getStyleService(styleId);
  res.status(200).send(styleFetched);
}

// 스타일 목록 조회
export async function getStyleList(req, res) {
  const stylesFetched = await getStyleListService(req.query);
  res.status(200).send(stylesFetched);
}
