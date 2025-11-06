import express from 'express';
import errHandler from '../middlewares/errhandler.js';
import { getStyles, getStylesList } from '../controllers/styles.js';
//import { putStyles, patchStyles, deleteStyles } from '../controllers/styles.js';

const stylesRouter = express.Router();

stylesRouter.get('/', errHandler(getStylesList));
stylesRouter.get('/:id', errHandler(getStyles));
//stylesRouter.get('/', errHandler(putStylesList));
//stylesRouter.get('/:id', errHandler(patchStyles));
//stylesRouter.get('/:id', errHandler(deleteStyles));

export default stylesRouter;
