import * as s from 'superstruct';

export const Url = s.define('Url', (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
});

export const Password = s.refine(s.string(), 'Password', (value) => {
  const lengthOk = value.length >= 8 && value.length <= 16;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return lengthOk && hasLetter && hasNumber;
});

export const NicknameLength = s.refine(
  s.string(),
  'NicknameLength',
  (value) => value.length >= 1 && value.length <= 20,
);

export const TitleLength = s.refine(
  s.string(),
  'TitleLength',
  (value) => value.length >= 1 && value.length <= 30,
);

export const ContentLength = s.refine(
  s.string(),
  'ContentLength',
  (value) => value.length >= 1 && value.length <= 500,
);

export const TagItemLength = s.refine(
  s.string(),
  'TagItemLength',
  (value) => value.length >= 1 && value.length <= 20,
);

// --- 카테고리 아이템 Refinements 및 Object ---

export const CategoryItemNameLength = s.refine(
  s.string(),
  'CategoryItemNameLength',
  (value) => value.length >= 1 && value.length <= 30,
);

export const CategoryItemBrandLength = s.refine(
  s.string(),
  'CategoryItemBrandLength',
  (value) => value.length >= 1 && value.length <= 30,
);

export const CategoryItemPriceRange = s.refine(
  s.number(),
  'CategoryItemPriceRange',
  (value) => value >= 0 && value <= 1000000000,
);

export const CategoryItem = s.object({
  name: CategoryItemNameLength,
  brand: CategoryItemBrandLength,
  price: CategoryItemPriceRange,
});

export const UrlArrayMin = s.refine(s.array(Url), 'UrlArrayMin', (value) => value.length >= 1);

export const CheckCuration = s.object({
  trendy: s.max(s.min(s.number(), 0), 10),
  personality: s.max(s.min(s.number(), 0), 10),
  practicality: s.max(s.min(s.number(), 0), 10),
  costEffectiveness: s.max(s.min(s.number(), 0), 10),
  nickname: s.size(s.string(), 1, 20),
  content: s.size(s.string(), 1, 150),
  password: Password,
});

export const CheckDeleteCuration = s.object({
  password: Password,
});

export const CheckComment = s.object({
  content: s.size(s.string(), 1, 150),
  password: Password,
  curationId: s.min(s.integer(), 1),
});
