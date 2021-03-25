import roles from './seed-data/roles'
import users from './seed-data/users'
import {PrismaClient} from '@prisma/client'
import { Hash } from 'crypto';
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function main(){
  for(let role of roles){
    await prisma.role.create({
      data:role
    })
  }

  for(let user of users){
    const salt = await bcrypt.genSalt(10);
    await prisma.user.create({
      data:{
        name:user.name,
        email:user.email,
        password:await bcrypt.hash(user.password, salt),
        address:user.address,
        contact:user.contact,
        userImage:user.userImage,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt,
        role:{
          connect:{
            id:user.role == "admin"? 1:2
          }
        }
      }
    })
  }
}

main().catch(e=>{
  console.log(e)
}).finally(()=>{
  prisma.$disconnect()
})