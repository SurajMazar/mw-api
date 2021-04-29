import { Request } from 'express';
import { ItemPerPage } from '../../../constants/site.config';
import { cleanSlug, slugGenerator } from '../../../utils/common.helpers';
import prisma from '../../../utils/prisma.helper';
import { paginate } from '../../../utils/response.helper';
import ChapterInterface from './chapter.interface';


interface FileRequest extends Request{
  files:any
}
class ChapterRepository implements ChapterInterface{

  public async getChapterByManga(req:Request){
    try{
      const page = Number(req.query.page)||0;
      const mangaId = Number(req.params.id);
      let chapters = await prisma.chapter.findMany({
        where:{
          manga:{
            id:mangaId
          }
        }
      });
      for(let i=0 ; i<chapters.length ; i++){
        if(chapters[i].pages){
          chapters[i].pages = JSON.parse(chapters[i].pages||'');
        }
      }
      const total = await prisma.chapter.count({
        where:{
          manga:{
            id:mangaId
          }
        }
      });
      return paginate('chapters',page,total,chapters);
    }catch(e){
      throw e;
    }
  }


  public async create(req:FileRequest){
    try{
      const {
        title,
        chapter_no,
        slug,
        published,
        publish_date,
        mangaId,
        free,
        meta_title,
        meta_description,
        meta_keywords,
      } = req.body;

      const {pages} = req.files;
      let serializedPages=null;
      if(pages){
        serializedPages = JSON.stringify(pages);
      }
      const  CleanSlug = cleanSlug(slug);
      const generatedSlug = await slugGenerator(prisma.genre,CleanSlug);

      const chapter = await prisma.chapter.create({
        data:{
          title:title,
          slug:generatedSlug,
          chapter_no:chapter_no,
          free:Boolean(free),
          published:Boolean(published),
          publish_date:new Date(publish_date),
          pages:serializedPages,
          createdAt:new Date(),
          updatedAt:new Date(),
          manga:{
            connect:{
              id:mangaId,
            }
          },
          mangaId:mangaId,
          meta_description:meta_description,
          meta_keywords:meta_keywords,
          meta_title:meta_title,
        }
      });
      return chapter;
    }catch(e){
      throw e;
    }
  }

}

export default ChapterRepository;