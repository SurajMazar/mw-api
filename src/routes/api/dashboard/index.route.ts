import express from 'express';
import dashboardAuthroutes from './auth.route';

const router = express.Router();

router.use('/auth',dashboardAuthroutes);


export default router;
