import prisma from '../../../utils/prisma.helper';
import {UserInterface} from './user.interface'
export class UserService implements UserInterface{

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
      throw new Error("User not found");
      ;
    }
  }


  

}