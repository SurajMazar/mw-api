import ChapterController from '../../../http/controller/backend/chapter.controller';
import express from 'express';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';

const router = express.Router();
const Chapter = new ChapterController();

router.get('/:id',jwtAuthMiddleware(['admin']),Chapter.index);
router.post('/create',jwtAuthMiddleware(['admin']),Chapter.create);


export default router;