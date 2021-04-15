import express from 'express';
import { loginRequest } from '../../../http/requests/login.request';
import {validate} from '../../../http/requests/validatorHelper'
import  { AuthController } from '../../../http/controller/backend/auth.controller';
import jwtAuthMiddleware from '../../../http/middleware/api.middleware';
import {upload} from '../../../utils/multer.helper';

const Auth = new AuthController(); // initiating controller
const router = express.Router();


router.post('/login',upload.any(),loginRequest(),validate,Auth.loginAdmin);
router.get('/profile',jwtAuthMiddleware(['admin']),Auth.profile);


export default router;