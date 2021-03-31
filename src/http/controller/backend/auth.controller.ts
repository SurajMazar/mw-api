import { Request, Response } from "express";
import {AuthService} from '../../repositories/auth/auth.repository';
import jwt from 'jsonwebtoken';
import {JWT_SECRETE} from '../../../constants/config';
import { formatResponse } from "../../../utils/response.helper";

const authService = new AuthService();

export class AuthController{


  public async login(req:Request,res:Response){
    try{
      const user = await authService.login(req.body.email,req.body.password);
      jwt.sign({user},JWT_SECRETE,{ expiresIn: 60 * 60 * 24 * 7 }, (err:any,token:any)=>{
          res.status(200).json(formatResponse(
            {
              token:token,
              user:user
            },true
          ))
        })
      }
    catch(e){
      res.status(422).json(formatResponse(
        {
          message:e,
        },false
      ))
    } 
  } // end login 



  public async profile(req:Request,res:Response){
    try{
      const profile = await authService.userProfile(req);
      res.status(200).json(formatResponse({
        profile:profile
      },true));
    }catch(e){
      res.status(500).json(formatResponse({
        message:e
      },false));
    }
  }// get user profile

}