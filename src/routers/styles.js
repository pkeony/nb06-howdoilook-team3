import express from 'express';
import errHandler from '../middlewares/errhandler.js';
import { getStyles, getStylesList } from '../controllers/styles.js';
import { createStyle, updateStyle, deleteStyle } from '../controllers/styles.js';

const stylesRouter = express.Router();

stylesRouter.get('/', errHandler(getStylesList));
stylesRouter.get('/:id', errHandler(getStyles));

stylesRouter.post('/', errHandler(createStyle));
stylesRouter.put('/:styleId', errHandler(updateStyle));
stylesRouter.delete('/:styleId', errHandler(deleteStyle));

export default stylesRouter;
