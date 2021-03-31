import express from 'express';
import authRoutes from './auth.route';
import mangaRoutes from './manga.route';

const router = express.Router();
router.use('/auth',authRoutes);
router.use('/manga',mangaRoutes);

export default router