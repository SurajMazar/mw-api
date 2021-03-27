import { User } from ".prisma/client";

export interface UserInterface{
  getUserById(id:number):Promise<User|any>;
  
}