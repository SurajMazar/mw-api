"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRequest = void 0;
var express_validator_1 = require("express-validator");
var genreRequest = function () {
    return [
        express_validator_1.check('name').notEmpty().withMessage('Genre name is required'),
        express_validator_1.check('slug').notEmpty().withMessage('Slug is required'),
    ];
};
exports.genreRequest = genreRequest;
