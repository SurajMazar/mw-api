import {Request} from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../../utils/prisma.helper';

export class UserService{

  public async getUserById(id:number){
    try{
      const user = await prisma.user.findUnique({
        where:{
          id:id
        },
        select:{
          id:true,
          name:true,
          email:true,
          address:true,
          contact:true,
          createdAt:true,
          userImage:true,
          updatedAt:true,
          role:true,
        },
      });
      return user;
    }catch{
      throw "user not found";
    }
  }

}