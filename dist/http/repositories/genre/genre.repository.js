"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_helper_1 = __importDefault(require("../../../utils/prisma.helper"));
var site_config_1 = require("../../../constants/site.config");
var response_helper_1 = require("../../../utils/response.helper");
var common_helpers_1 = require("../../../utils/common.helpers");
var GenreRepository = /** @class */ (function () {
    function GenreRepository() {
    }
    GenreRepository.prototype.index = function (req) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var page, keyword, genres, total, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        page = Number(req.query.page);
                        keyword = ((_a = (req.query.keyword)) === null || _a === void 0 ? void 0 : _a.toString()) || '';
                        return [4 /*yield*/, prisma_helper_1.default.genre.findMany({
                                orderBy: {
                                    createdAt: 'desc',
                                },
                                skip: page * site_config_1.ItemPerPage - site_config_1.ItemPerPage || 0,
                                take: site_config_1.ItemPerPage,
                                where: {
                                    OR: [
                                        { name: { contains: keyword } },
                                        { slug: { contains: keyword } },
                                        { description: { contains: keyword } }, // search keyword query
                                    ]
                                }
                            })];
                    case 1:
                        genres = _b.sent();
                        return [4 /*yield*/, prisma_helper_1.default.genre.count()];
                    case 2:
                        total = _b.sent();
                        return [2 /*return*/, response_helper_1.paginate('genres', page, total, genres)];
                    case 3:
                        e_1 = _b.sent();
                        throw new Error(e_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // store genre in the database 
    GenreRepository.prototype.store = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name_1, slug, description, CleanSlug, generatedSlug, genre, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, name_1 = _a.name, slug = _a.slug, description = _a.description;
                        CleanSlug = common_helpers_1.cleanSlug(slug);
                        return [4 /*yield*/, common_helpers_1.slugGenerator(prisma_helper_1.default.genre, CleanSlug)];
                    case 1:
                        generatedSlug = _b.sent();
                        return [4 /*yield*/, prisma_helper_1.default.genre.create({
                                data: {
                                    name: name_1,
                                    slug: generatedSlug,
                                    description: description,
                                    createdAt: new Date(),
                                    updatedAt: new Date()
                                }
                            })];
                    case 2:
                        genre = _b.sent();
                        return [2 /*return*/, genre];
                    case 3:
                        e_2 = _b.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // store genre in the database 
    // get genre by id
    GenreRepository.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var genre;
            return __generator(this, function (_a) {
                try {
                    genre = prisma_helper_1.default.genre.findUnique({
                        where: {
                            id: id
                        }
                    });
                    return [2 /*return*/, genre];
                }
                catch (e) {
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    // get genre by id
    // update genre
    GenreRepository.prototype.update = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, name_2, slug, description, createdAt, CleanSlug, generatedSlug, preGenre, genre, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        id = Number(req.params.id);
                        _a = req.body, name_2 = _a.name, slug = _a.slug, description = _a.description, createdAt = _a.createdAt;
                        CleanSlug = common_helpers_1.cleanSlug(slug);
                        return [4 /*yield*/, common_helpers_1.slugGenerator(prisma_helper_1.default.genre, CleanSlug)];
                    case 1:
                        generatedSlug = _b.sent();
                        return [4 /*yield*/, this.show(id)];
                    case 2:
                        preGenre = _b.sent();
                        return [4 /*yield*/, prisma_helper_1.default.genre.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    name: name_2,
                                    slug: (preGenre === null || preGenre === void 0 ? void 0 : preGenre.slug) === slug ? slug : generatedSlug,
                                    description: description,
                                    createdAt: createdAt,
                                    updatedAt: new Date()
                                }
                            })];
                    case 3:
                        genre = _b.sent();
                        return [2 /*return*/, genre];
                    case 4:
                        e_3 = _b.sent();
                        throw e_3;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return GenreRepository;
}());
exports.default = GenreRepository;
