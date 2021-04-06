import { MangaInterface } from "./manga.interface";
import prisma from '../../../utils/prisma.helper';
import { Request } from "express";
import { ItemPerPage } from "../../../constants/site.config";
import {paginate} from '../../../utils/response.helper';
export class MangaRepository implements MangaInterface{

  public async index(req:Request){
    try{
      const page = Number(req.query.page) || 1 ;
      const keyword = (req.query.page)?.toString() || '';
      const mangas = await prisma.manga.findMany({
        orderBy:{
          createdAt:'asc'
        },
        take:ItemPerPage,
        skip:page * ItemPerPage - ItemPerPage,
        where:{
          OR:[
            {title:{contains:keyword}},
            {slug:{contains:keyword}},
            {genres:{
              every:{
                name:{contains:keyword}
              }
            }}
          ],
        }
      })
      const total = await prisma.manga.count();
      return paginate('mangas',page,total,mangas);
    }catch(e){
      throw e;
    }
  }

}