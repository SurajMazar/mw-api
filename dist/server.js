"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api/api"));
var cors_1 = __importDefault(require("cors"));
var multer_helper_1 = __importDefault(require("./utils/multer.helper"));
var app = express_1.default();
// json parser for body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(multer_helper_1.default);
app.use(cors_1.default());
app.use('/api', api_1.default); // api routes
app.listen(5000); // serving the express app
