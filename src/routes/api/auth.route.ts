import express from 'express';
import { loginRequest } from '../../http/requests/login.request';
import {validate} from '../../http/requests/validatorHelper'
import  { AuthController } from '../../http/controller/auth.controller';
import jwtAuthMiddleware from '../../http/middleware/api.middleware';

const Auth = new AuthController(); // initiating controller
const router = express.Router();


router.post('/login',loginRequest(),validate,Auth.login);
router.get('/profile',jwtAuthMiddleware,Auth.profile);

export default router;