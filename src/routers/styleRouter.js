import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { createStyle, updateStyle, deleteStyle } from '../controllers/styleController.js';

const stylesRouter = express.Router();

stylesRouter.post('/', withTryCatch(createStyle));
stylesRouter.put('/:styleId', withTryCatch(updateStyle));
stylesRouter.delete('/:styleId', withTryCatch(deleteStyle));

export default stylesRouter;
