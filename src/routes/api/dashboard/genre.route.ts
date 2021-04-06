import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import GenreController from '../../../http/controller/backend/genre.controller';
import {genreRequest} from '../../../http/requests/genre.request';
import {validate} from '../../../http/requests/validatorHelper';

const Genre = new GenreController();
const router = express.Router();


router.use(jwtAuthMiddleware(['admin']));

router.get('/',Genre.index);
router.post('/store',genreRequest(),validate,Genre.store);
router.put('/update/:id',genreRequest(),validate,Genre.update);




export default router;