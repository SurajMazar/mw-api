import { Request, Response } from "express";
import { formatResponse } from "../../../utils/response.helper";


export class MangaController{

  public index(req:Request,res:Response){
    res.json(formatResponse({
      data:"this is from manga controller"
    },true))
  }

}