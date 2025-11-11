// import express from 'express';
// const app = express();
// app.use(express.json());

// export default function asyncHandler(handler) {
//   return async function (req, res) {
//     try {
//       await handler(req, res);
//     } catch (e) {
//       console.error(e);
//       if (e.name === 'StructError' || e instanceof Prisma.PrismaClientValidationError) {
//         res.status(400).send({ message: '잘못된 요청입니다.' });
//       } else if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
//         res.status(404).send({ mdssage: '존재하지 않습니다.' });
//       } else {
//         res.status(500).send({ message: e.message });
//       }
//     }
//   };
// }

import { Prisma } from '@prisma/client';
import { StructError } from 'superstruct';

export default function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e);

      if (e instanceof StructError) {
        if (e.failures().some((f) => f.refinement === 'Password')) {
          res.status(400).send({ message: '*영문, 숫자조합 8~16자리로 입력해주세요' });
        } else if (e.failures().some((f) => f.refinement === 'MinCategories')) {
          res.status(400).send({ message: '*최소 하나 이상 선택해주세요' });
        } else {
          res.status(400).send({ message: '*필수 입력사항입니다.' });
        }
        return;
      }

      if (e.message === 'FORBIDDEN') {
        res.status(403).send({ message: '비밀번호가 일치하지 않습니다.' });
        return;
      }

      if (e.message === 'NOT_FOUND') {
        res.status(404).send({ message: '스타일을 찾을 수 없습니다.' });
        return;
      }

      if (e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ message: '잘못된 요청입니다.' });
        return;
      }

      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          res.status(404).send({ message: '존재하지 않습니다.' });
          return;
        }
      }

      res.status(500).send({ message: e.message || '서버 내부 오류가 발생했습니다.' });
    }
  };
}
