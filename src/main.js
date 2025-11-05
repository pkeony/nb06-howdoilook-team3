import express from 'express';
import cors from 'cors';
import stylesRouter from './routers/styles.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/styles', stylesRouter);

app.listen(3001, () => console.log(`Server_3001 started`));
