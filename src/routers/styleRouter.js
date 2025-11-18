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

stylesRouter.post('/', withTryCatch(createStyle));
stylesRouter.put('/:styleId', withTryCatch(updateStyle));
stylesRouter.delete('/:styleId', withTryCatch(deleteStyle));
stylesRouter.get('/', validateQueryKeys(allowedKeys), withTryCatch(getStyleList));
stylesRouter.get('/:styleId', withTryCatch(getStyle));

export default stylesRouter;
