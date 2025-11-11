import { assert } from 'superstruct';
import { CheckCuration } from '../structs/structs.js';
import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';

export const getCurations = async (req, res) => {
  const { offset = 0, limit = 10, order = 'recent' } = req.query;
  const curations = await prisma.curation.findMany({
    skip: Number(offset),
    take: Number(limit),
    include: {
      comment: true,
    },
  });
  res.json(curations);
};

export const createCuration = async (req, res) => {
  assert(req.body, CheckCuration);
  const curation = await prisma.curation.create({ data: req.body });
  res.status(201).json(curation);
};

export const updateCuration = async (req, res) => {
  assert(req.body, CheckCuration);
  const { id } = req.params;
  const curation = await prisma.curation.update({
    where: { id },
    data: req.body,
  });
  if (!curation) {
    throw new NotFoundError('curation', id);
  }
  res.json(curation);
};

export const deleteCuration = async (req, res) => {
  const { id } = req.params;
  const curation = await prisma.curation.findUnique({ where: { id } });
  if (!curation) {
    throw new NotFoundError('article', id);
  }
  await prisma.curation.delete({ where: { id } });

  return res.status(204).send();
};
