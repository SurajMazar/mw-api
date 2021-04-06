import { Genre } from "@prisma/client";
import { Request } from "express";

export interface GenreInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<Genre>;
  show(id:number):Promise<Genre|null>;
  update(req:Request):Promise<Genre>;
}