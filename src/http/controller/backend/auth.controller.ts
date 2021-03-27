///<reference path="../../../utils/response.helper.ts"/>
import { Request, Response } from "express";
import {AuthService} from '../../repositories/auth/auth.repository';
import jwt from 'jsonwebtoken';
import {JWT_SECRETE} from '../../../constants/config';

const authService = new AuthService();

export class AuthController{


  public async login(req:Request,res:Response){
    try{
      const user = await authService.login(req.body.email,req.body.password);
      jwt.sign({user},JWT_SECRETE,{ expiresIn: 60 * 60 * 24 * 7 }, (err:any,token:any)=>{
          res.json(fr.formatResponse(
            {
              token:token,
              user:user
            },true
          ))
        })
      }
    catch(e){
      res.status(422).json(fr.formatResponse(
        {
          errors:e,
        },false
      ))
    } 
  } // end login 



  public async profile(req:Request,res:Response){
    try{
      const profile = await authService.userProfile(req);
      res.status(200).json(fr.formatResponse({
        profile:profile
      },true));
    }catch(e){
      res.status(500).json(fr.formatResponse({
        errors:e
      },false));
    }
  }// get user profile

}