import { genre } from "@prisma/client";
import { Request } from "express";

export interface GenreInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<genre>;
  show(id:number):Promise<genre|null>;
}