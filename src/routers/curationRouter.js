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
 *             required:
 *               - nickname
 *               - content
 *               - password
 *               - trendy
 *               - personality
 *               - practicality
 *               - costEffectiveness
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 작성자 닉네임 (1~20자)
 *               content:
 *                 type: string
 *                 description: 큐레이션 내용 (1~150자)
 *               password:
 *                 type: string
 *                 description: 스타일 패스워드
 *               trendy:
 *                 type: integer
 *                 description: 트렌디 점수 (0~10)
 *               personality:
 *                 type: integer
 *                 description: 개성 점수 (0~10)
 *               practicality:
 *                 type: integer
 *                 description: 실용성 점수 (0~10)
 *               costEffectiveness:
 *                 type: integer
 *                 description: 가성비 점수 (0~10)
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - nickname
 *               - content
 *               - trendy
 *               - personality
 *               - practicality
 *               - costEffectiveness
 *             properties:
 *               password:
 *                 type: string
 *                 description: 스타일 비밀번호
 *               nickname:
 *                 type: string
 *               content:
 *                 type: string
 *               trendy:
 *                 type: integer
 *               personality:
 *                 type: integer
 *               practicality:
 *                 type: integer
 *               costEffectiveness:
 *                 type: integer
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: 스타일 패스워드
 *     responses:
 *       200:
 *         description: 삭제 성공
 */
curationRouter.delete('/:curationId', withTryCatch(deleteCuration));
