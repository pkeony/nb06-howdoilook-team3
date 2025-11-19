import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getStyleRankingList } from '../controllers/rankingController.js';
import { validateQueryKeys, validateQueryValues } from '../middlewares/validateQuery.js';

const rankingRouter = express.Router();
const allowedKeys = ['page', 'pageSize', 'rankBy'];
const allowedValues = ['total', 'trendy', 'personality', 'practicality', 'costEffectiveness'];
/**
 * @swagger
 * tags:
 *   name: Ranking
 *   description: 스타일 랭킹 API
 */

/**
 * @swagger
 * /ranking:
 *   get:
 *     summary: 스타일 랭킹 조회
 *     tags: [Ranking]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: rankBy
 *         schema:
 *           type: string
 *           enum: [total, trendy, personality, practicality, costEffectiveness]
 *     responses:
 *       200:
 *         description: 조회 성공
 */

rankingRouter.get(
  '/',
  validateQueryKeys(allowedKeys),
  validateQueryValues(allowedValues),
  withTryCatch(getStyleRankingList)
);

export default rankingRouter;
