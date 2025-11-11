import express from 'express';
import { withTryCatch } from '../lib/withTryCatch.js';
import { getStyle, getStyleList } from '../controllers/styleController1.js';

const stylesRouter1 = express.Router();

stylesRouter1.get('/', withTryCatch(getStyleList));
stylesRouter1.get('/:styleId', withTryCatch(getStyle));

export default stylesRouter1;
