import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

export async function getStylesList(req, res) {
  const { offset = 0, limit = 0, order = 'recent', nickname, title, content, tags } = req.query;
  let orderBy;
  switch (order) {
    case 'recent':
      orderBy = { createdAt: 'desc' };
      break;
    case 'oldest':
      orderBy = { createdAt: 'asc' };
      break;
    case 'view':
      orderBy = { viewCount: 'desc' };
      break;
    case 'curation':
      orderBy = { curationCount: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  const styles = await prisma.styles.findMany({
    where: {
      nickname: { contains: nickname },
      title: { contains: title },
      content: { contains: content },
      tags: { some: { name: { contains: tags } } },
    },
    orderBy,
    skip: parseInt(offset),
    take: parseInt(limit) || undefined,
    include: {
      images: {
        where: { isPrimary: true },
        select: { url: true },
      },
      tags: true,
      curation: true,
      updatedAt: false,
    },
  });
  res.status(200).send(styles);
}

export async function getStyles(req, res) {
  const id = Number(req.params.id);
  const style = await prisma.styles.findFirstOrThrow({
    where: { id },
    include: {
      //images: { select: { url: true } },
      images: true,
      curation: true,
      updatedAt: false,
    },
  });
  res.status(200).send(style);
}
