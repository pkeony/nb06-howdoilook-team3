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
  return (lengthOk && hasLetter && hasNumber) || '*영문, 숫자조합 8~16자리로 입력해주세요';
});

export const NicknameLength = s.refine(
  s.string(),
  'NicknameLength',
  (value) => (value.length >= 1 && value.length <= 20) || '*20자 이내로 입력해주세요.'
);

export const UrlArrayMin = s.refine(
  s.array(Url),
  'UrlArrayMin',
  (value) => value.length >= 1 || '*필수 입력사항입니다.'
);

export const Score0to10 = s.refine(s.union([s.number(), s.string()]), 'Score0to10', (value) => {
  const num = Number(value);
  return (num >= 0 && num <= 10) || '0~10 사이의 숫자를 입력해주세요.';
});

export const CheckCuration = s.object({
  trendy: Score0to10,
  personality: Score0to10,
  practicality: Score0to10,
  costEffectiveness: Score0to10,
  nickname: s.size(s.string(), 1, 20),
  content: s.size(s.string(), 1, 150),
  password: Password
});

export const CheckDeleteCuration = s.object({
  password: Password
});

export const CheckComment = s.object({
  content: s.size(s.string(), 1, 150),
  password: Password,
  curationId: s.optional(s.min(s.integer(), 1)) // 여기에만 옵션으로 수정
  // comment 생성할 때에는 prisma가 id를 자동으로 만들어주기 때문에, 여기에 필수 필드로 되어 있으면 에러 남
});

export const CheckDeleteComment = s.object({
  password: Password
});
