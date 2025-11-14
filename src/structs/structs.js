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
  (value) => (value.length >= 1 && value.length <= 20) || '*20자 이내로 입력해주세요.',
);

export const UrlArrayMin = s.refine(
  s.array(Url),
  'UrlArrayMin',
  (value) => value.length >= 1 || '*필수 입력사항입니다.',
);

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
