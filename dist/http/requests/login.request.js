"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRequest = void 0;
var express_validator_1 = require("express-validator");
var loginRequest = function () {
    return [
        express_validator_1.check('email').isEmail().notEmpty().withMessage('Enter your email'),
        express_validator_1.check('password').notEmpty().withMessage('Enter your password'),
    ];
};
exports.loginRequest = loginRequest;
