import express from 'express';
import { Prisma } from '@prisma/client';

const app = express();
app.use(express.json());

export default function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e);
      if (e.name === 'StructError' || e instanceof Prisma.PrismaClientValidationError) {
        res.status(400).send({ message: '잘못된 요청입니다.' });
      } else if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
        res.status(404).send({ mdssage: '존재하지 않습니다.' });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}
