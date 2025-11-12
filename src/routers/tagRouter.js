import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getPupularTags } from '../tagService.js';

const tagsRouter = express.Router();

tagsRouter.get('/', withTryCatch(getPupularTags));

export default tagsRouter;
