import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import MangaController from '../../../http/controller/backend/manga.controller';
import {validate} from '../../../http/requests/validatorHelper';
import {getMulterInstance} from '../../../utils/multer.helper';
import {mangaRequest} from "../../../http/requests/manga.request";

const Manga = new MangaController();
const router = express.Router();


router.use(jwtAuthMiddleware(['admin']));
router.get('/',Manga.index);


const mangaUpload = getMulterInstance('/mangas',[{name:'thumbnail'},{name:'cover_picture'}]);
router.post('/store',mangaUpload,mangaRequest(),validate,Manga.store);
router.put('/update/:id',mangaUpload,mangaRequest(),validate,Manga.update);


export default router;