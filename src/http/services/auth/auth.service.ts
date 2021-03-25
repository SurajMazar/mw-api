import prisma from '../../../utils/prisma.helper';
import {Request} from 'express';
import jwt from 'jsonwebtoken';

const bcrypt = require('bcrypt');


export class AuthService{

  public async login(email:string,password:string){

    try{
      const LoginUser = await  prisma.user.findUnique({
        where:{
          email:email
        },
        include:{
          role:true
        },
      })
  
      if(LoginUser){
        const value =await bcrypt.compare(password, LoginUser.password);
        if(value){
          const user:any = LoginUser;
          delete user.password;
          return user;
        }
        throw "Invalid Credentials";
      }
    }catch{
      throw "Invalid Credentials";
    }

  }


   public async userProfile(req:Request){
    try{
      const authorization = req.headers.authorization!;
      const token = authorization?.split('Bearer ')[1];
      const user = await jwt.decode(token);
      return user;
    }catch{
      throw "User not found";
    }
  }


}