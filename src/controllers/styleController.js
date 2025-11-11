import {
  createStyleService,
  updateStyleService,
  deleteStyleService,
} from '../services/styleService.js';

import { assert } from 'superstruct';
import { CheckStyle, CheckDeleteStyle } from '../structs/structs.js';

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

  res.status(200).json({ message: '성공적으로 삭제되었습니다.' });
};
