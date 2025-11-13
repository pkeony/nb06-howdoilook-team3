import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import {
  createCuration,
  getCurations,
  updateCuration,
  deleteCuration,
} from '../controllers/curationController.js';
export const curationStyleRouter = express.Router();
export const curationRouter = express.Router();

curationStyleRouter.post('/:styleId/curations', withTryCatch(createCuration));
curationStyleRouter.get('/:styleId/curations', withTryCatch(getCurations));
curationRouter.put('/:curationId', withTryCatch(updateCuration));
curationRouter.delete('/:curationId', withTryCatch(deleteCuration));
