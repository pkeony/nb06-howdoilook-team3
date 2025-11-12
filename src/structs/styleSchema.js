import * as s from 'superstruct';
import {
  Password,
  NicknameLength,
  TitleLength,
  ContentLength,
  TagItemLength,
  CategoryItem,
  UrlArrayMin,
} from './structs.js';

export const CheckStyle = s.object({
  nickname: NicknameLength,
  title: TitleLength,
  content: ContentLength,
  password: Password,
  tags: s.refine(s.array(TagItemLength), 'TagsMax3', (arr) => {
    return arr.length >= 0 && arr.length <= 3;
  }),
  imageUrls: UrlArrayMin, // 최소 1개 검사 적용

  // 카테고리 최소 선택 검사
  categories: s.refine(
    s.object({
      TOP: s.optional(CategoryItem),
      BOTTOM: s.optional(CategoryItem),
      OUTER: s.optional(CategoryItem),
      DRESS: s.optional(CategoryItem),
      SHOES: s.optional(CategoryItem),
      BAG: s.optional(CategoryItem),
      ACCESSORY: s.optional(CategoryItem),
    }),
    'MinCategories',
    (obj) => Object.values(obj).some((val) => val !== undefined && val !== null),
  ),
});

export const CheckDeleteStyle = s.object({
  password: Password,
});
