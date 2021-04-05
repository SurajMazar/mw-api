"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaController = void 0;
var response_helper_1 = require("../../../utils/response.helper");
var MangaController = /** @class */ (function () {
    function MangaController() {
    }
    MangaController.prototype.index = function (req, res) {
        res.json(response_helper_1.formatResponse({
            data: "this is from manga controller"
        }, true));
    };
    return MangaController;
}());
exports.MangaController = MangaController;
