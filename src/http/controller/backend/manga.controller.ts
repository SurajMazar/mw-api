import { Request, Response } from "express";
import { formatResponse } from "../../../utils/response.helper";
import {MangaRepository} from "../../repositories/manga/manga.repository";

const Manga = new MangaRepository()
class MangaController{

  public async index(req:Request,res:Response){
    try{
      const mangas = await Manga.index(req);
      res.status(200).json(formatResponse(mangas,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }


  public async store(req:Request,res:Response){
    try{
      const manga = await Manga.store(req);
      res.status(200).json(formatResponse(manga,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }

}


export default MangaController;