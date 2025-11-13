import express from 'express';
import cors from 'cors';
import rankingRouter from './routers/rankingRouter.js';
import { defaultNotFoundHandler, globalErrorHandler } from './middlewares/syErrorHandler.js';
import { PORT } from './lib/constants.js';
import stylesRouter from './routers/styleRouter.js';
import stylesRouter1 from './routers/styleRouter1.js';
import tagsRouter from './routers/tagRouter.js';
import { curationRouter, curationStyleRouter } from './routers/curationRouter.js';
//import commentsRouter from './routers/comments.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/styles', stylesRouter);
app.use('/styles', stylesRouter1);
app.use('/tags', tagsRouter);
app.use('/ranking', rankingRouter);
app.use('/curations', curationRouter);
app.use('/styles', curationStyleRouter);
//app.use('/comments', commentsRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3000, () => console.log(`Server started`));
