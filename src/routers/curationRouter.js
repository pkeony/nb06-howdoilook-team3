import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import {
  createCuration,
  getCurations,
  updateCuration,
  deleteCuration
} from '../controllers/curationController.js';
export const curationStyleRouter = express.Router();
export const curationRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Curation
 *   description: 스타일별 큐레이션 API
 */

/**
 * @swagger
 * /styles/{styleId}/curations:
 *   post:
 *     summary: 스타일에 큐레이션 생성
 *     tags: [Curation]
 *     parameters:
 *       - in: path
 *         name: styleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 스타일 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성 성공
 */
curationStyleRouter.post('/:styleId/curations', withTryCatch(createCuration));

/**
 * @swagger
 * /styles/{styleId}/curations:
 *   get:
 *     summary: 스타일별 큐레이션 조회
 *     tags: [Curation]
 *     parameters:
 *       - in: path
 *         name: styleId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 조회 성공
 */
curationStyleRouter.get('/:styleId/curations', withTryCatch(getCurations));

/**
 * @swagger
 * /curations/{curationId}:
 *   put:
 *     summary: 큐레이션 수정
 *     tags: [Curation]
 *     parameters:
 *       - in: path
 *         name: curationId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: 수정 성공
 */
curationRouter.put('/:curationId', withTryCatch(updateCuration));

/**
 * @swagger
 * /curations/{curationId}:
 *   delete:
 *     summary: 큐레이션 삭제
 *     tags: [Curation]
 *     parameters:
 *       - in: path
 *         name: curationId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: 삭제 성공
 */
curationRouter.delete('/:curationId', withTryCatch(deleteCuration));
