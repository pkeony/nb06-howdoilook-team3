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
 *             required:
 *               - nickname
 *               - title
 *               - content
 *               - password
 *               - tags
 *               - imageUrls
 *               - categories
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: "선영"
 *               title:
 *                 type: string
 *                 example: "봄 캐주얼룩"
 *               content:
 *                 type: string
 *                 example: "가볍게 입기 좋은 봄 스트릿 캐주얼 코디입니다."
 *               password:
 *                 type: string
 *                 example: "1234"
 *               tags:
 *                 type: array
 *                 maxItems: 3
 *                 items:
 *                   type: string
 *                 example: ["street", "casual"]
 *               imageUrls:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                 example: [
 *                   "https://example.com/img1.png",
 *                   "https://example.com/img2.png"
 *                 ]
 *               categories:
 *                 type: object
 *                 description: 최소 하나는 반드시 포함해야 함
 *                 properties:
 *                   TOP:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   BOTTOM:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   OUTER:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   DRESS:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   SHOES:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   BAG:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   ACCESSORY:
 *                     $ref: '#/components/schemas/CategoryItem'
 *     responses:
 *       201:
 *         description: 생성 완료
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryItem:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           example: "오버핏 맨투맨"
 *         brand:
 *           type: string
 *           example: "무신사 스탠다드"
 *         price:
 *           type: integer
 *           example: 29900
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               nickname:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               password:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               imageUrls:
 *                 type: array
 *                 items:
 *                   type: string
 *               categories:
 *                 type: object
 *                 properties:
 *                   TOP:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   BOTTOM:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   OUTER:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   DRESS:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   SHOES:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   BAG:
 *                     $ref: '#/components/schemas/CategoryItem'
 *                   ACCESSORY:
 *                     $ref: '#/components/schemas/CategoryItem'
 *     responses:
 *       200:
 *         description: 수정 성공
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
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 삭제 성공
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
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [latest, popular]
 *       - in: query
 *         name: searchBy
 *         schema:
 *           type: string
 *           enum: [title, tags, content]
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
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
