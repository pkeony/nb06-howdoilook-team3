import * as s from 'superstruct';

const Url = s.define('Url', (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
});

const Password = s.refine(s.string(), 'Password', (value) => {
  const lengthOk = value.length >= 8 && value.length <= 16;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  return lengthOk && hasLetter && hasNumber;
});

// const CATEGORYTYPE = ['top', 'bottom', 'outer', 'dress', 'shoes', 'bag', 'accessory'];

const CategoryItem = s.object({
  name: s.size(s.string(), 1, 30),
  brand: s.size(s.string(), 1, 30),
  price: s.max(s.min(s.number(), 0), 1000000000),
});

export const CheckStyle = s.object({
  nickname: s.size(s.string(), 1, 20),
  title: s.size(s.string(), 1, 30),
  content: s.size(s.string(), 1, 500),
  password: Password,
  tags: s.size(s.array(s.size(s.string(), 1, 20)), 0, 3),
  imageUrls: s.size(s.array(Url), 1, Infinity),

  // 'categories'를 배열이 아닌 객체로 검증하도록 수정
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

// export const CheckStyles = s.object({
//   nickname: s.size(s.string(), 1, 20),
//   title: s.size(s.string(), 1, 30),
//   tags: s.size(s.array(s.size(s.string(), 1, 20)), 0, 3),
//   imageUrls: s.size(s.array(Url), 1, undefined),
//   categories: s.array(
//     s.size(
//       s.object({
//         type: s.enums(CATEGORYTYPE),
//         name: s.size(s.string(), 1, 30),
//         brand: s.size(s.string(), 1, 30),
//         price: s.max(s.min(s.number(), 0), 1000000000),
//         stylesId: s.min(s.integer(), 1),
//       }),
//       1,
//       7,
//     ),
//   ),
//   content: s.size(s.string(), 1, 500),
//   password: Password,
// });

export const CheckCuration = s.object({
  trendy: s.max(s.min(s.number(), 0), 10),
  personality: s.max(s.min(s.number(), 0), 10),
  practicality: s.max(s.min(s.number(), 0), 10),
  costEffectiveness: s.max(s.min(s.number(), 0), 10),
  nickname: s.size(s.string(), 1, 20),
  content: s.size(s.string(), 1, 150),
  password: Password,
});

export const CheckComment = s.object({
  content: s.size(s.string(), 1, 150),
  password: Password,
  curationId: s.min(s.integer(), 1),
});
