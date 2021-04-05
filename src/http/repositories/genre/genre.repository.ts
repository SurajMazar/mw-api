import { Request } from 'express';
import prisma from '../../../utils/prisma.helper';
import {GenreInterface} from './genre.interface';
import {ItemPerPage} from '../../../constants/site.config';
import {paginate} from '../../../utils/response.helper';
import {slugGenerator,cleanSlug} from '../../../utils/common.helpers';

class GenreRepository implements GenreInterface{

  public async index(req:Request){
    try{
      const page = Number(req.query.page);
      const genres = await prisma.genre.findMany({
        orderBy:{
          createdAt:'desc',
        },
        skip:page * ItemPerPage - ItemPerPage || 0,
        take:ItemPerPage
      })
      const total = await prisma.genre.count();
      return paginate('genres',page,total,genres);
    }catch(e){
      throw new Error(e);
    }
  }



  // store genre in the database 
  public async store(req:Request){
    try{
      const {name,slug,description} = req.body;
      const  CleanSlug = cleanSlug(slug);
      const generatedSlug = await slugGenerator(prisma.genre,CleanSlug) 
      const genre = await prisma.genre.create({
        data:{
          name:name,
          slug:generatedSlug,
          description:description,
          createdAt:new Date(),
          updatedAt:new Date()
        }
      })
      return genre;
    }catch(e){
      throw e;
    }
  }
  // store genre in the database 



  // get genre by id
  public async show(id:number){
    try{
      const genre = prisma.genre.findUnique({
        where:{
          id:id
        }
      })
      return genre;
    }catch(e){
      throw e;
    }
  }
  // get genre by id




}

export default GenreRepository;