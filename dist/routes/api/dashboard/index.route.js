"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_route_1 = __importDefault(require("./auth.route"));
var genre_route_1 = __importDefault(require("./genre.route"));
var router = express_1.default.Router();
router.use('/auth', auth_route_1.default);
router.use('/genres', genre_route_1.default);
exports.default = router;
