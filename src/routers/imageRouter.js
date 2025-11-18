import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { upload, uploadImage } from '../controllers/imageController.js';

const imageRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: 이미지 업로드 API
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: 이미지 업로드
 *     tags: [Image]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: 업로드 성공
 */
imageRouter.post('/images', upload.single('image'), withTryCatch(uploadImage));
export default imageRouter;
