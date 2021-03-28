import prisma from '../../../utils/prisma.helper';
import { User } from '@prisma/client';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../user/user.service';

const bcrypt = require('bcrypt');
const userService = new UserService();

export class AuthService {

  public async login(email: string, password: string) {

    try {
      const LoginUser = await prisma.user.findUnique({
        where: {
          email: email
        },
        include: {
          role: true
        },
      });

      if (LoginUser) {
        const value = await bcrypt.compare(password, LoginUser.password);
        if (value) {
          const user: any = LoginUser;
          delete user.password;
          return user;
        }
        throw "Invalid Credentials";
      }
    } catch {
      throw "Invalid Credentials";
    }

  }


  public async getUserProfile(userId: number) {
    try {

      if (userId) {
        let user = await userService.getUserById(userId);
        return user;
      }
      throw "User not found";
    } catch {
      throw "User not found";
    }
  }




}