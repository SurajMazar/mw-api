"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_route_1 = __importDefault(require("./dashboard/index.route"));
var auth_route_1 = __importDefault(require("./auth.route"));
var manga_route_1 = __importDefault(require("./manga.route"));
var router = express_1.default.Router();
router.use('/administration', index_route_1.default);
router.use('/auth', auth_route_1.default);
router.use('/manga', manga_route_1.default);
exports.default = router;
