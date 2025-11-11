import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getStyleRankingList } from '../controllers/rankingController.js';

const rankingRouter = express.Router();

rankingRouter.get('/', withTryCatch(getStyleRankingList));

export default rankingRouter;
