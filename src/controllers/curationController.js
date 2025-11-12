import { assert } from 'superstruct';
import { CheckCuration } from '../structs/structs.js';
import { prisma } from '../lib/prismaClient.js';
import NotFoundError from '../lib/errors/NotFoundError.js';
import {
  getCurationsService,
  createCurationService,
  updateCurationSerivce,
  deleteCurationService,
} from '../services/curationService.js';

export const getCurations = async (req, res) => {
  const { styleId } = req.params;
  const { page, pageSize, searchBy, keyword } = req.query;

  const curations = await getCurationsService(styleId, page, pageSize, searchBy, keyword);
  res.status(200).json(curations);
};

export const createCuration = async (req, res) => {
  const { styleId } = req.params;

  assert(req.body, CheckCuration);

  const curation = await createCurationService(styleId, req.body);

  res.status(201).json(curation);
};

export const updateCuration = async (req, res) => {
  assert(req.body, CheckCuration);

  const updatedCuration = await updateCurationSerivce(curationId, password, req.body);

  res.status(200).json(updatedCuration);
};

export const deleteCuration = async (req, res) => {
  const { password } = req.body;
  const { curationId } = req.params;

  await deleteCurationService(curationId, password);
  res.status(204).send();
};
