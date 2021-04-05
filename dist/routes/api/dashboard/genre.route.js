"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_middleware_1 = __importDefault(require("../../../http/middleware/api.middleware"));
var genre_controller_1 = __importDefault(require("../../../http/controller/backend/genre.controller"));
var genre_request_1 = require("../../../http/requests/genre.request");
var validatorHelper_1 = require("../../../http/requests/validatorHelper");
var Genre = new genre_controller_1.default();
var router = express_1.default.Router();
router.use(api_middleware_1.default(['admin']));
router.get('/', Genre.index);
router.post('/store', genre_request_1.genreRequest(), validatorHelper_1.validate, Genre.store);
router.put('/update/:id', genre_request_1.genreRequest(), validatorHelper_1.validate, Genre.update);
exports.default = router;
