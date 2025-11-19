import {
  createStyleService,
  updateStyleService,
  deleteStyleService
} from '../services/styleService.js';

import { assert } from 'superstruct';
import { CheckStyle, CheckDeleteStyle } from '../structs/styleSchema.js';
import { getStyleService, getStyleListService } from '../services/styleService.js';

// 스타일 등록
export const createStyle = async (req, res) => {
  assert(req.body, CheckStyle);
  const styleData = req.body;
  const newStyle = await createStyleService(styleData);

  res.status(201).json(newStyle);
};

// 스타일 수정
export const updateStyle = async (req, res) => {
  assert(req.body, CheckStyle);

  const { styleId } = req.params;
  const updateData = req.body;
  const updatedStyle = await updateStyleService(styleId, updateData);

  res.status(200).json(updatedStyle);
};

// 스타일 삭제
export const deleteStyle = async (req, res) => {
  assert(req.body, CheckDeleteStyle);

  const { styleId } = req.params;
  const { password } = req.body;
  await deleteStyleService(styleId, password);

  res.status(200).json({ message: '스타일 삭제 성공' });
};

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
