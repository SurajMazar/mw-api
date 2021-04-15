"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var api_1 = __importDefault(require("./routes/api/api"));
var cors_1 = __importDefault(require("cors"));
var response_helper_1 = require("./utils/response.helper");
var node_path_1 = __importDefault(require("node:path"));
var app = express_1.default();
// json parser for body
app.use(express_1.default.static(node_path_1.default.join(__dirname, '../public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
app.get('/', function (req, res) {
    res.send(" \n    <h4>Welcome to MW on http://localhost:5000/api we can get various routes for api!!<h4>\n    <p>Import below link into postman collections to see the existing routes!</p>\n    <p>https://www.getpostman.com/collections/fb5ce346b02b42d14fd1</p>\n  ");
});
app.use('/api', api_1.default); // api routes
// for 404 api 
app.use('*', function (req, res) {
    res.status(404).json(response_helper_1.formatResponse({
        message: "404 error!! The requested route doesnt exists."
    }, false));
});
// end 404 api route
app.listen(5000); // serving the express app
