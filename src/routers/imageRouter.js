import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { upload, uploadImage } from '../controllers/imageController.js';

const imageRouter = express.Router();

imageRouter.post('/images', upload.single('image'), withTryCatch(uploadImage));

export default imageRouter;
