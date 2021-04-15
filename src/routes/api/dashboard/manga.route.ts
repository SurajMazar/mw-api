import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import MangaController from '../../../http/controller/backend/manga.controller';
import {validate} from '../../../http/requests/validatorHelper';
import {getMulterInstance} from '../../../utils/multer.helper';

const Manga = new MangaController();
const router = express.Router();


router.use(jwtAuthMiddleware(['admin']));
router.get('/',Manga.index);


const mangaUpload = getMulterInstance('/mangas',[{name:'thumbnail'},{name:'cover_picture'}]);
router.post('/store', mangaUpload ,Manga.store);


export default router;