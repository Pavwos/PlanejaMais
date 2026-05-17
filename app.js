import cors from 'cors';
import express from 'express';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);
app.use(errorMiddleware);

export default app;
