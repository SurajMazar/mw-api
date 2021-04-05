"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromBearer = void 0;
var jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
var config_1 = require("../../constants/config");
var response_helper_1 = require("../../utils/response.helper");
var getTokenFromBearer = function (req) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        throw new jsonwebtoken_1.JsonWebTokenError("No authorization Header");
    }
    try {
        var token = authorization === null || authorization === void 0 ? void 0 : authorization.split('Bearer ')[1];
        return token;
    }
    catch (_a) {
        throw new jsonwebtoken_1.JsonWebTokenError("Invalid token format");
    }
};
exports.getTokenFromBearer = getTokenFromBearer;
var unauthenticatedError = function (res) {
    return res.status(401).json(response_helper_1.formatResponse({
        errors: 'unauthenticated',
    }, false));
};
function jwtAuthMiddleware(userRole) {
    var _this = this;
    if (userRole === void 0) { userRole = null; }
    return function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
        var token, decoded, role, e_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = exports.getTokenFromBearer(req);
                    return [4 /*yield*/, jsonwebtoken_1.default.verify(token, config_1.JWT_SECRETE)];
                case 1:
                    _b.sent();
                    res.locals.token = token;
                    decoded = jsonwebtoken_1.default.decode(token);
                    role = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.user) === null || _a === void 0 ? void 0 : _a.role;
                    // role check 
                    if (userRole) {
                        if (role && (role === null || role === void 0 ? void 0 : role.name)) {
                            if (userRole.indexOf(role === null || role === void 0 ? void 0 : role.name.toLowerCase()) !== -1) {
                                next();
                                return [2 /*return*/];
                            }
                        }
                        return [2 /*return*/, unauthenticatedError(res)];
                    }
                    else { // role check 
                        next();
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _b.sent();
                    if (e_1 instanceof jsonwebtoken_1.JsonWebTokenError) {
                        unauthenticatedError(res);
                        return [2 /*return*/];
                    } // end if
                    res.status(500).json({
                        message: "Internal server Error",
                        errors: e_1.message,
                        stack: e_1.stack
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
}
exports.default = jwtAuthMiddleware;
