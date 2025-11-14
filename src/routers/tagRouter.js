import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getPopularTags } from '../controllers/tagController.js';
import { validateQueryKeys } from '../middlewares/validateQuery.js';

const tagsRouter = express.Router();

tagsRouter.get('/', validateQueryKeys(['n']), withTryCatch(getPopularTags));

export default tagsRouter;
