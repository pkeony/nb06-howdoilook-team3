import { PrismaClient } from '@prisma/client';
import { assert } from 'superstruct';
import { CheckCuration } from '../structs/structs.js';
import { prisma } from '../lib/prismaClient.js';

export const getCurations = async (req, res) => {
  const { offset = 0, limit = 10, order = 'recent' } = req.query;
  const curations = await prisma.curation.findMany({});
};

export const createCuration = async (req, res) => {
  assert(req.body, CheckCuration);
  const curation = await prisma.curation.create({ data: req.body });
  res.status(201).json(curation);
};

export const updateCuration = async (req, res) => {
  assert(req.body, CheckCuration);
  const curation = await prisma.curation.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.json(curation);
};

export const deleteCuration = async (req, res) => {
  await prisma.curation.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
