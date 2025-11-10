import express from 'express';
import { getStyles, getStylesList } from '../controllers/styles.js';
import { createStyle, updateStyle, deleteStyle } from '../controllers/styles.js';
import { withTryCatch } from '../lib/withTryCatch.js';

const stylesRouter = express.Router();

stylesRouter.get('/', withTryCatch(getStylesList));
stylesRouter.get('/:id', withTryCatch(getStyles));

stylesRouter.post('/', withTryCatch(createStyle));
stylesRouter.put('/:styleId', withTryCatch(updateStyle));
stylesRouter.delete('/:styleId', withTryCatch(deleteStyle));

export default stylesRouter;
