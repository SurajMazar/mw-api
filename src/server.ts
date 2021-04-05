import express from 'express';
import {PORT} from './constants/config';
import routes from './routes/api/api';
import cors from 'cors';
import multer from './utils/multer.helper';

const app = express();
// json parser for body
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(multer)
app.use(cors());

app.use('/api',routes); // api routes

app.listen(process.env.PORT);// serving the express app

