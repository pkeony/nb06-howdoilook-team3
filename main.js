import express from 'express';
import cors from 'cors';
import stylesRouter from './src/routers/styles.js';
import { PrismaClient } from '@prisma/client/extension';

//import curationsRouter from './routers/curations.js';
//import commentsRouter from './routers/comments.js';

const app = express();
app.use(express.json());
app.use(cors());
app.use(PrismaClient);

app.use('/styles', stylesRouter);
//app.use('/curations', curationsRouter);
//app.use('/comments', commentsRouter);

app.listen(3000, () => console.log(`Server_3000 started`));
