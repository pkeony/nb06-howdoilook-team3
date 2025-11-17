import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

export const getCurationsService = async (styleId, page = 1, pageSize = 10, searchBy, keyword) => {
  const take = Number(pageSize);
  const skip = (Number(page) - 1) * take;

  const style = await prisma.style.findUnique({
    where: { id: Number(styleId) },
  });

  if (!style) {
    throw new NotFoundError('style', styleId);
  }

  const where = { stylesId: Number(styleId) };

  if (searchBy === 'nickname' || searchBy === 'content') {
    where[searchBy] = {
      contains: keyword,
      mode: 'insensitive',
    };
  }

  const totalItemCount = await prisma.curation.count({ where });
  const totalPages = Math.ceil(totalItemCount / take); //총량/페이지사이즈

  const curations = await prisma.curation.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: 'asc' },
    include: {
      comment: true,
    },
  });

  if (!curations) {
    throw new NotFoundError('Curation', styleId);
  }

  const data = curations.map((c) => ({
    id: c.id,
    nickname: c.nickname,
    content: c.content,
    trendy: c.trendy,
    personality: c.personality,
    practicality: c.practicality,
    costEffectiveness: c.costEffectiveness,
    createdAt: c.createdAt,
    comment: c.comment
      ? {
          id: c.comment.id,
          nickname: c.comment.nickname,
          content: c.comment.content,
          createdAt: c.comment.createdAt,
        }
      : {},
  }));

  return { currentPage: Number(page), totalPages, totalItemCount, data };
};

export const createCurationService = async (styleId, body) => {
  const curation = await prisma.curation.create({
    data: { ...body, stylesId: Number(styleId) },
  });

  if (!curation) throw new NotFoundError('Style', styleId);

  await prisma.style.update({
    where: { id: Number(styleId) },
    data: {
      curationCount: { increment: 1 },
    },
  });

  const { password, updatedAt, stylesId, ...rest } = curation;

  return rest;
};

export const updateCurationSerivce = async (id, curationPassword, body) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) },
  });

  if (!curation) {
    throw new NotFoundError('Curation', id);
  }

  if (curation.password != curationPassword) {
    throw new Error('FORBIDDEN');
  }

  const updatedCuration = await prisma.curation.update({
    where: { id: Number(id) },
    data: body,
  });
  const { password, updatedAt, stylesId, ...rest } = updatedCuration;

  return rest;
};

export const deleteCurationService = async (id, password) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) },
  });

  if (!curation) {
    throw new NotFoundError('Curation', id);
  }

  if (curation.password != password) {
    throw new Error('FORBIDDEN');
  }

  await prisma.curation.delete({ where: { id: Number(id) } });
};
