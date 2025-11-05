import express from 'express';
import errHandler from '../lib/errhandler.js';
import { getStyles, getStylesList } from '../controllers/styles.js';

const stylesRouter = express.Router();

stylesRouter.get('/', errHandler(getStylesList));
stylesRouter.get('/:id', errHandler(getStyles));

export default stylesRouter;
