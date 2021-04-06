import express from 'express';
import dashboardAuthroutes from './auth.route';
import DGenreRoutes from './genre.route';
import MangaRoutes from './manga.route';

const router = express.Router();

router.use('/auth',dashboardAuthroutes);
router.use('/genres',DGenreRoutes);
router.use('/mangas',MangaRoutes);

export default router;
