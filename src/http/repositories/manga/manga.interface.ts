import { Manga } from "@prisma/client";
import { Request } from "express";

export interface MangaInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<Manga>;
  store(req:Request):Promise<Manga>;
}