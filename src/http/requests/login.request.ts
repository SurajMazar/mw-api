import {check} from 'express-validator';

export const loginRequest = () => {
  return [
    check('email').isEmail().notEmpty().withMessage('Enter your email'),
    check('password').notEmpty().withMessage('Enter your password'),
  ]
}