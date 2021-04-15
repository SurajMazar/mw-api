import express, { Request, Response } from 'express';
import {PORT} from './constants/config';
import routes from './routes/api/api';
import cors from 'cors';
import { formatResponse } from './utils/response.helper';


const app = express();
// json parser for body
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());


app.get('/',(req:Request,res:Response)=>{
  res.send(` 
    <h4>Welcome to MW on http://localhost:5000/api we can get various routes for api!!<h4>
    <p>Import below link into postman collections to see the existing routes!</p>
    <p>https://www.getpostman.com/collections/fb5ce346b02b42d14fd1</p>
  `)
});

app.use('/api',routes); // api routes

// for 404 api 
app.use('*', (req:Request, res:Response)=>{
  res.status(404).json(formatResponse({
    message:"404 error!! The requested route doesnt exists."
  },false))
});
// end 404 api route


app.listen(5000);// serving the express app

