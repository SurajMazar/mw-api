import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import MangaController from '../../../http/controller/backend/manga.controller';
import {validate} from '../../../http/requests/validatorHelper';

const Manga = new MangaController();
const router = express.Router();


router.use(jwtAuthMiddleware(['admin']));
router.get('/',Manga.index);



export default router;