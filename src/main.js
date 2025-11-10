import express from 'express';
import cors from 'cors';
import stylesRouter from './routers/styles.js';
import { defaultNotFoundHandler, globalErrorHandler } from './controllers/errorController.js';
//import curationsRouter from './routers/curations.js';
//import commentsRouter from './routers/comments.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/styles', stylesRouter);
//app.use('/curations', curationsRouter);
//app.use('/comments', commentsRouter);
app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(3001, () => console.log(`Server_3001 started`));
