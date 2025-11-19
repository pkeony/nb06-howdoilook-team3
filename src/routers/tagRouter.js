import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getPopularTags } from '../controllers/tagController.js';
import { validateQueryKeys } from '../middlewares/validateQuery.js';

const tagsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tag
 *   description: 태그 API
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: 인기 태그 조회
 *     tags: [Tag]
 *     parameters:
 *       - in: query
 *         name: n
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 성공
 */
tagsRouter.get('/', validateQueryKeys(['n']), withTryCatch(getPopularTags));
export default tagsRouter;
