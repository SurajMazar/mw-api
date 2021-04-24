import {check} from 'express-validator';

export const mangaRequest = () =>{
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('slug').notEmpty().withMessage('Slug is required'),
    check('publish_date').notEmpty().withMessage('Slug is required'),
    check('status').notEmpty().withMessage('Status is required'),
  ]
}