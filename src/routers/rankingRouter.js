import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getStyleRankingList } from '../controllers/rankingController.js';
import { validateQueryKeys, validateQueryValues } from '../middlewares/validateQuery.js';

const rankingRouter = express.Router();
const allowedKeys = ['page', 'pageSize', 'rankBy'];
const allowedValues = ['total', 'trendy', 'personality', 'practicality', 'costEffectiveness'];

rankingRouter.get(
  '/',
  validateQueryKeys(allowedKeys),
  validateQueryValues(allowedValues),
  withTryCatch(getStyleRankingList),
);

export default rankingRouter;
