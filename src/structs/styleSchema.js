import * as s from 'superstruct';

import { Password, NicknameLength, UrlArrayMin } from './structs.js';

export const TitleLength = s.refine(
  s.string(),
  'TitleLength',
  (value) => (value.length >= 1 && value.length <= 30) || '*30자 이내로 입력해주세요.',
);

export const ContentLength = s.refine(
  s.string(),
  'ContentLength',
  (value) => (value.length >= 1 && value.length <= 500) || '*500자 이내로 입력해주세요.',
);

export const TagItemLength = s.refine(
  s.string(),
  'TagItemLength',
  (value) => (value.length >= 1 && value.length <= 20) || '*20자 이내로 입력해주세요.',
);

// --- Style 카테고리 아이템 관련 ---

export const CategoryItemNameLength = s.refine(
  s.string(),
  'CategoryItemNameLength',
  (value) => (value.length >= 1 && value.length <= 30) || '*30자 이내로 입력해주세요.',
);

export const CategoryItemBrandLength = s.refine(
  s.string(),
  'CategoryItemBrandLength',
  (value) => (value.length >= 1 && value.length <= 30) || '*30자 이내로 입력해주세요.',
);

export const CategoryItemPriceRange = s.refine(
  s.number(),
  'CategoryItemPriceRange',
  (value) => (value >= 0 && value <= 1000000000) || '*10억원 이하로 입력해주세요.',
);

export const CategoryItem = s.object({
  name: CategoryItemNameLength,
  brand: CategoryItemBrandLength,
  price: CategoryItemPriceRange,
});

// --- Style 최종 스키마 (에러 메시지 포함) ---

export const CheckStyle = s.object({
  nickname: NicknameLength,
  title: TitleLength,
  content: ContentLength,
  password: Password,

  tags: s.refine(s.array(TagItemLength), 'TagsMax3', (arr) => {
    const isValid = arr.length >= 0 && arr.length <= 3;
    return isValid || '*태그는 최대 3개까지 등록 가능합니다.';
  }),

  imageUrls: UrlArrayMin,

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
    (obj) => {
      const isValid = Object.values(obj).some((val) => val !== undefined && val !== null);
      return isValid || '*최소 하나 이상 선택해주세요.';
    },
  ),
});

export const CheckDeleteStyle = s.object({
  password: Password,
});
