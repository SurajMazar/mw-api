import express from 'express';
import dashboardAuthroutes from './auth.route';
import DGenreRoutes from './genre.route';

const router = express.Router();

router.use('/auth',dashboardAuthroutes);
router.use('/genres',DGenreRoutes);


export default router;
