import express from 'express';
import cors from 'cors';
//import rankingRouter from './routers/rankingRouter.js';
import styleRouter from './routers/styleRouter.js';
import styleRouter1 from './routers/styleRouter1.js';
import { defaultNotFoundHandler, globalErrorHandler } from './middlewares/errorHandler.js';
import { PORT } from './lib/constants.js';
//import curationsRouter from './routers/curations.js';
//import commentsRouter from './routers/comments.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/styles', styleRouter);
app.use('/styles', styleRouter1);
//app.use('/ranking', rankingRouter);
//app.use('/curations', curationsRouter);
//app.use('/comments', commentsRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3001, () => console.log(`Server started`));
