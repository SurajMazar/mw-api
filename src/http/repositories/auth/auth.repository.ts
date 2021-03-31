import prisma from '../../../utils/prisma.helper';
import {User} from '@prisma/client';
import {Request} from 'express';
import jwt from 'jsonwebtoken';
import {UserService} from '../user/user.repository';

const bcrypt = require('bcrypt');
const userService = new UserService();

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
      });
  
      if(LoginUser){
        const value =await bcrypt.compare(password, LoginUser.password);
        if(value){
          const user:any = LoginUser;
          delete user.password;
          return user;
        }
      }
      throw "Invalid Credentials";
    }catch{
      throw "Invalid Credentials";
    }

  }

  public async loginAdmin(email:string,password:string){
    try{
      const LoginUser = await  prisma.user.findUnique({
        where:{
          email:email
        },
        include:{
          role:true
        },
      });
  
      if(LoginUser){
        const role = LoginUser?.role;
        if(role?.name.toLowerCase() === 'admin' ){
          const value =await bcrypt.compare(password, LoginUser.password);
          if(value){
            const user:any = LoginUser;
            delete user.password;
            return user;
          }
        }
        throw "Invalid Credentials";
      }
      throw "Invalid Credentials";
    }catch{
      throw "Invalid Credentials";
    }

  }
 


  public async userProfile(req:Request){
    try{
      const authorization = req.headers.authorization!;
      const token = authorization?.split('Bearer ')[1];
      const decoded:any = jwt.decode(token);
      if(decoded.user.id){
        let user = await userService.getUserById(decoded.user.id);
        return user;
      }
      throw "User not found";
    }catch{
      throw "User not found";
    }
  }




}