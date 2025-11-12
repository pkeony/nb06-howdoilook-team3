import express from 'express';
import cors from 'cors';
import styleRouter from './routers/styleRouter.js';
import styleRouter1 from './routers/styleRouter1.js';
import { defaultNotFoundHandler, globalErrorHandler } from './middlewares/errorHandler.js';
import { PORT } from './lib/constants.js';
import commentRouter from './routers/commentRouter.js';
//import curationsRouter from './routers/curations.js';
//import rankingRouter from './routers/rankingRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/styles', styleRouter);
app.use('/styles', styleRouter1);
app.use('/', commentRouter);
//app.use('/ranking', rankingRouter);
//app.use('/curations', curationsRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT || 3001, () => console.log(`Server started`));
