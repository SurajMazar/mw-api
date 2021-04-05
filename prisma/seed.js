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
var roles_1 = __importDefault(require("./seed-data/roles"));
var users_1 = __importDefault(require("./seed-data/users"));
var client_1 = require("@prisma/client");
var bcrypt = require('bcrypt');
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, roles_2, role, _a, users_2, user, salt, _b, _c;
        var _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _i = 0, roles_2 = roles_1.default;
                    _f.label = 1;
                case 1:
                    if (!(_i < roles_2.length)) return [3 /*break*/, 4];
                    role = roles_2[_i];
                    return [4 /*yield*/, prisma.role.create({
                            data: role
                        })];
                case 2:
                    _f.sent();
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _a = 0, users_2 = users_1.default;
                    _f.label = 5;
                case 5:
                    if (!(_a < users_2.length)) return [3 /*break*/, 10];
                    user = users_2[_a];
                    return [4 /*yield*/, bcrypt.genSalt(10)];
                case 6:
                    salt = _f.sent();
                    _c = (_b = prisma.user).create;
                    _d = {};
                    _e = {
                        name: user.name,
                        email: user.email
                    };
                    return [4 /*yield*/, bcrypt.hash(user.password, salt)];
                case 7: return [4 /*yield*/, _c.apply(_b, [(_d.data = (_e.password = _f.sent(),
                            _e.address = user.address,
                            _e.contact = user.contact,
                            _e.userImage = user.userImage,
                            _e.createdAt = user.createdAt,
                            _e.updatedAt = user.updatedAt,
                            _e.role = {
                                connect: {
                                    id: user.role == "admin" ? 1 : 2
                                }
                            },
                            _e),
                            _d)])];
                case 8:
                    _f.sent();
                    _f.label = 9;
                case 9:
                    _a++;
                    return [3 /*break*/, 5];
                case 10: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) {
    console.log(e);
}).finally(function () {
    prisma.$disconnect();
});