import { MangaInterface } from "./manga.interface";
import prisma from '../../../utils/prisma.helper';
import { Request } from "express";
import { ItemPerPage } from "../../../constants/site.config";
import {paginate} from '../../../utils/response.helper';
import { cleanSlug, slugGenerator } from "../../../utils/common.helpers";


interface FileRequest extends Request{
  files:any
}


export class MangaRepository implements MangaInterface{

  public async index(req:Request){
    try{
      const page = Number(req.query.page) || 1 ;
      const keyword = (req.query.keyword)?.toString() || '';
      const mangas = await prisma.manga.findMany({
        orderBy:{
          title:'asc'
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

  public async show(id:number){
    try{
      const manga =  await prisma.manga.findUnique({
        where:{
          id:id
        }
      });
      return manga;
    }catch (e) {
      throw e;
    }
  }

  /**update manga*/
  public async update(req:FileRequest){
    try{

      const id = Number(req.params.id) || 0;
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
        status,
        cover_picture:cp,
        thumbnail:thumb
      } = req.body;


      let cover_picture = null ; let thumbnail = null;
      if(req.files){
        const {cover_picture:ci,thumbnail:th} = req.files;
        if(ci){
          cover_picture = 'uploads/mangas/' + ci[0].filename;
        }
        if(th){
          thumbnail = 'uploads/mangas/' + th[0].filename;
        }
      }
      const prev = await this.show(id);
      const cslug = cleanSlug(slug);
      const generatedSlug = prev?.slug === slug? prev?.slug : await slugGenerator(prisma.manga,cslug);
      const manga = prisma.manga.update({
        where:{
          id:id,
        },
        data:{
          title:title,
          excerpt:excerpt,
          slug:generatedSlug,
          description:description,
          publish_date:new Date(publish_date),
          published:published?Boolean(published):false,
          status:status,
          cover_picture:cover_picture || cp,
          thumbnail:thumbnail || thumb ,
          meta_title:meta_title || null,
          meta_description:meta_description || null,
          meta_keywords:meta_keywords || null,
          updatedAt:new Date(),
        }
      })
      return manga;
    }catch(e){
      console.log(e);
      throw e;
    }
  }// end update

}