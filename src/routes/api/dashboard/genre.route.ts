import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import GenreController from '../../../http/controller/backend/genre.controller';
import {genreRequest} from '../../../http/requests/genre.request';
import {validate} from '../../../http/requests/validatorHelper';
import {upload} from '../../../utils/multer.helper';

const Genre = new GenreController();
const router = express.Router();


router.use(jwtAuthMiddleware(['admin']));

router.get('/',Genre.index);
router.post('/store',upload.any(),genreRequest(),validate,Genre.store);
router.put('/update/:id',upload.any(),genreRequest(),validate,Genre.update);




export default router;