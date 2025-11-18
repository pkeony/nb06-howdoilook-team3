import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { validateQueryKeys } from '../middlewares/validateQuery.js';
import {
  createStyle,
  updateStyle,
  deleteStyle,
  getStyle,
  getStyleList
} from '../controllers/styleController.js';

const stylesRouter = express.Router();

const allowedKeys = ['page', 'pageSize', 'sortBy', 'searchBy', 'keyword', 'tag'];

/**
 * @swagger
 * tags:
 *   name: Styles
 *   description: 스타일 API
 */

/**
 * @swagger
 * /styles:
 *   post:
 *     summary: 새로운 스타일 생성
 *     tags: [Styles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/style1.png"
 *               description:
 *                 type: string
 *                 example: "캐주얼 스트릿룩"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["street", "casual"]
 *     responses:
 *       201:
 *         description: 스타일 생성 완료
 */
stylesRouter.post('/', withTryCatch(createStyle));

/**
 * @swagger
 * /styles/{styleId}:
 *   put:
 *     summary: 스타일 수정
 *     tags: [Styles]
 *     parameters:
 *       - in: path
 *         name: styleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 Style ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/updated.png"
 *               description:
 *                 type: string
 *                 example: "업데이트된 스타일 설명"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["modern", "minimal"]
 *     responses:
 *       200:
 *         description: 수정 성공
 *       404:
 *         description: Style ID 없음
 */
stylesRouter.put('/:styleId', withTryCatch(updateStyle));

/**
 * @swagger
 * /styles/{styleId}:
 *   delete:
 *     summary: 스타일 삭제
 *     tags: [Styles]
 *     parameters:
 *       - in: path
 *         name: styleId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 Style ID
 *     responses:
 *       200:
 *         description: 삭제 완료
 *       404:
 *         description: Style ID 없음
 */
stylesRouter.delete('/:styleId', withTryCatch(deleteStyle));

/**
 * @swagger
 * /styles:
 *   get:
 *     summary: 스타일 목록 조회
 *     tags: [Styles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [latest, popular]
 *         example: latest
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *           enum: [description, tags]
 *         example: description
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         example: "캐주얼"
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         example: "street"
 *     responses:
 *       200:
 *         description: 조회 성공
 */
stylesRouter.get('/', validateQueryKeys(allowedKeys), withTryCatch(getStyleList));

/**
 * @swagger
 * /styles/{styleId}:
 *   get:
 *     summary: 특정 스타일 상세 조회
 *     tags: [Styles]
 *     parameters:
 *       - in: path
 *         name: styleId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 조회 성공
 *       404:
 *         description: Style ID 없음
 */
stylesRouter.get('/:styleId', withTryCatch(getStyle));

export default stylesRouter;
