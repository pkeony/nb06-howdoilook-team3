import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getStyle, getStyleList } from '../controllers/styleController1.js';
import { validateQueryKeys } from '../middlewares/validateQuery.js';

const stylesRouter1 = express.Router();
const allowedKeys = ['page', 'pageSize', 'sortBy', 'searchBy', 'keyword', 'tag'];

stylesRouter1.get('/', validateQueryKeys(allowedKeys), withTryCatch(getStyleList));
stylesRouter1.get('/:styleId', withTryCatch(getStyle));

export default stylesRouter1;
