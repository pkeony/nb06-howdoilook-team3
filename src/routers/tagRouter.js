import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getPopularTags } from '../controllers/tagController.js';

const tagsRouter = express.Router();

tagsRouter.get('/', withTryCatch(getPopularTags));

export default tagsRouter;
