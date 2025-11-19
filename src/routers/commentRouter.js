import express from 'express';
import {
  createCommentController,
  updateCommentController,
  deleteCommentController
} from '../controllers/commentController.js';
import { withTryCatch } from '../lib/withTryCatch.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: 댓글(답글) API
 */

/**
 * @swagger
 * /curations/{curationId}/comments:
 *   post:
 *     summary: 특정 큐레이션에 댓글(답글) 생성
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: curationId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 댓글을 등록할 Curation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "좋은 스타일이네요!"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       201:
 *         description: 댓글 등록 성공
 *       400:
 *         description: 잘못된 요청
 */
router.post('/curations/:curationId/comments', withTryCatch(createCommentController));

/**
 * @swagger
 * /comments/{commentId}:
 *   put:
 *     summary: 댓글(답글) 수정
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: "수정된 내용입니다!"
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *       404:
 *         description: 해당 댓글 없음
 */
router.put('/comments/:commentId', withTryCatch(updateCommentController));

/**
 * @swagger
 * /comments/{commentId}:
 *   delete:
 *     summary: 댓글(답글) 삭제
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *       404:
 *         description: 해당 댓글 없음
 */
router.delete('/comments/:commentId', withTryCatch(deleteCommentController));

export default router;
