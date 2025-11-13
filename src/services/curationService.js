import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

export const getCurationsService = async (styleId, page = 1, pageSize = 10, searchBy, keyword) => {
  const take = Number(pageSize);
  const skip = (Number(page) - 1) * take;

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
      Comment: true,
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
    comment: c.Comment
      ? {
          id: c.Comment.id,
          nickname: c.Comment.nickname,
          content: c.Comment.content,
          createdAt: c.Comment.createdAt,
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

  return curation;
};

export const updateCurationSerivce = async (id, password, body) => {
  const curation = await prisma.curation.findUnique({
    where: { id: Number(id) },
  });

  if (!curation) {
    throw new NotFoundError('Curation', id);
  }

  if (curation.password != password) {
    throw new Error('FORBIDDEN');
  }

  const updatedCuration = await prisma.curation.update({
    where: { id: Number(id) },
    data: body,
  });

  return updatedCuration;
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
