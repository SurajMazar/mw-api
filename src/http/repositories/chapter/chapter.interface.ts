import { Chapter } from "@prisma/client";
import { Request } from "express";

interface ChapterInterface{
  getChapterByManga(req:Request):Promise<any>;
  create(req:Request):Promise<Chapter>;
}

export default ChapterInterface;