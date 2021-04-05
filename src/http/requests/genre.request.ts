import {check} from 'express-validator';

export const genreRequest = () => {
  return [
    check('name').notEmpty().withMessage('Genre name is required'),
    check('slug').notEmpty().withMessage('Slug is required'),
  ]
}