import express from 'express';
import jwtAuthMiddleware from '../../http/middleware/api.middleware';
import {MangaController} from '../../http/controller/backend/manga.controller'; 

const router = express.Router();
const Manga = new MangaController();

router.get('/',jwtAuthMiddleware,Manga.index);
router.get('/',Manga.index);


export default router;

