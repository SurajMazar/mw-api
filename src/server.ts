import express from 'express';
import {PORT} from './constants/config';
import routes from './routes/api/api';

const app = express();
// json parser for body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api',routes); // api routes

app.listen(5000);// serving the express app

