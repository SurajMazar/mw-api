import {Request} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../../utils/prisma.helper';

export class UserService{

  public async getUserByEmail(email:string){
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:email
        },
        select:{
          password:false,
          role:true,
        },
      });
      return user;
    }catch{
      throw "user not found";
    }
  }

}