import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import {
  createCuration,
  getCurations,
  updateCuration,
  deleteCuration,
} from '../controllers/curationController.js';

const curationRouter = express.Router();

curationRouter.post('/styles/:styleId/curations', withTryCatch(createCuration));
curationRouter.get('/styles/:styleId/curations', withTryCatch(getCurations));
curationRouter.put('/curations/:curationId', withTryCatch(updateCuration));
curationRouter.delete('/curations/:curationId', withTryCatch(deleteCuration));

export default curationRouter;
