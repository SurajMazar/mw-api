import express from 'express';
import dashboardRoute from './dashboard/index.route';
import authRoutes from './auth.route';
import mangaRoutes from './manga.route';

const router = express.Router();
router.use('/administration',dashboardRoute);
router.use('/auth',authRoutes);
router.use('/manga',mangaRoutes);

export default router