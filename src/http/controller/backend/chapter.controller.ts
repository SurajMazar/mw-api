import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.helper';
import ChapterRepository from '../../repositories/chapter/Chapter.repository';


const Chapter = new ChapterRepository();

class ChapterController {

  /**
   * get chapters by manga
   */
  public async index(req:Request,res:Response){ 
    try{
      const chapters = await Chapter.getChapterByManga(req);
      res.status(200).json(formatResponse(chapters,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }

  /**
   * create chapters
   */
  public async create(req:Request,res:Response){
    try{
      const chapter = await Chapter.create(req);
      res.status(200).json(formatResponse(chapter,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }


}

export default ChapterController;