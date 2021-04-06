import { Request } from "express";

export interface MangaInterface{
  index(req:Request):any;
}