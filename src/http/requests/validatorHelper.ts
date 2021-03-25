import { NextFunction, Request, Response } from 'express';
import {validationResult} from 'express-validator';

export const validate = (req:Request,res:Response,next:NextFunction)=>{
  const errors = validationResult(req);

  if(errors.isEmpty()){
    return next();
  }

  const formattedError:any = [];

  errors.array().map(err=>{
    formattedError.push({
      [err.param]:err.msg
    })
  })

  return res.status(422).json({
    errors:formattedError
  })
}