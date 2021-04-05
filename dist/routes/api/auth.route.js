"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var login_request_1 = require("../../http/requests/login.request");
var validatorHelper_1 = require("../../http/requests/validatorHelper");
var auth_controller_1 = require("../../http/controller/backend/auth.controller");
var api_middleware_1 = __importDefault(require("../../http/middleware/api.middleware"));
var Auth = new auth_controller_1.AuthController(); // initiating controller
var router = express_1.default.Router();
router.post('/login', login_request_1.loginRequest(), validatorHelper_1.validate, Auth.login);
router.get('/profile', api_middleware_1.default(), Auth.profile);
exports.default = router;
