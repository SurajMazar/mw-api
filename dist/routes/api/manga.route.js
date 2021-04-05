"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_middleware_1 = __importDefault(require("../../http/middleware/api.middleware"));
var manga_controller_1 = require("../../http/controller/backend/manga.controller");
var router = express_1.default.Router();
var Manga = new manga_controller_1.MangaController();
router.get('/', api_middleware_1.default, Manga.index);
router.get('/', Manga.index);
exports.default = router;
