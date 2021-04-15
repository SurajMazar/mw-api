import { MangaInterface } from "./manga.interface";
import prisma from '../../../utils/prisma.helper';
import { Request } from "express";
import { ItemPerPage } from "../../../constants/site.config";
import {paginate} from '../../../utils/response.helper';
import { cleanSlug, slugGenerator } from "../../../utils/common.helpers";
import { uploadDir } from '../../../constants/config';


interface FileRequest extends Request{
  files:any
}


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
        },
        include:{
          authors:{},
          genres:{},
        }
      })
      const total = await prisma.manga.count();
      return paginate('mangas',page,total,mangas);
    }catch(e){
      throw e;
    }
  }


  /**
   * create manga 
  */
  public async store(req:FileRequest) {
    try{

      const {
        title,
        excerpt,
        slug,
        description,
        publish_date,
        published,
        meta_title,
        meta_description,
        meta_keywords,
        status
      } = req.body;

      let cover_picture,thumbnail;
      if(req.files){
        const {cover_picture:ci,thumbnail:th} = req.files;
        if(ci){
          cover_picture = 'uploads/mangas/' + ci[0].filename;
        }
        if(th){
          thumbnail = 'uploads/mangas/' + th[0].filename;
        }
      }

      const cslug = cleanSlug(slug);
      const generatedSlug =await slugGenerator(prisma.manga,cslug);
      const manga =await prisma.manga.create({
        data:{
          title:title,
          excerpt:excerpt,
          slug:generatedSlug,
          description:description,
          publish_date:new Date(publish_date),
          published:Boolean(published),
          status:status,
          cover_picture:cover_picture || null,
          thumbnail:thumbnail || null ,
          meta_title:meta_title || null,
          meta_description:meta_description || null,
          meta_keywords:meta_keywords || null,
          createdAt:new Date(),
          updatedAt:new Date(),
        }
      })
      return manga;
    }catch(e){
      console.log(e)
      throw e;
    }

  }
  /**
   * end create manga
   */

}