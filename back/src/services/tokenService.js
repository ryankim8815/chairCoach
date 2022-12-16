"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var Token_model_1 = __importDefault(require("../models/Token.model"));
var ClientError = __importStar(require("../responses/clientErrorResponse"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var moment_timezone_1 = __importDefault(require("moment-timezone"));
moment_timezone_1.default.tz.setDefault("Asia/Seoul");
var tokenService = /** @class */ (function () {
    function tokenService() {
    }
    //// 전체 운동 기록 조회 기능
    tokenService.reissueToken = function (_a) {
        var currentRefreshToken = _a.currentRefreshToken, user_id = _a.user_id, ipAddress = _a.ipAddress;
        return __awaiter(this, void 0, void 0, function () {
            var checkToken, isSameIpAdress, secretKey, accessToken, refreshToken, status, created_at, tokenUpdate, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Token_model_1.default.findByRefreshToken({
                            currentRefreshToken: currentRefreshToken,
                        })];
                    case 1:
                        checkToken = _b.sent();
                        if (checkToken.length == 0 || checkToken[0].status == "expired") {
                            throw ClientError.unauthorized("유효한 토큰이 아닙니다.");
                        }
                        isSameIpAdress = checkToken[0].ip_address == ipAddress;
                        if (!isSameIpAdress)
                            throw ClientError.unauthorized("[토큰탈취의심] 토큰을 발급받은 위치가 아닌 곳에서 토큰을 활용한 요청이 들어왔습니다.");
                        secretKey = process.env.JWT_SECRET_KEY;
                        accessToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            user_id: user_id,
                        }, secretKey);
                        refreshToken = jsonwebtoken_1.default.sign({
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
                            user_id: user_id,
                        }, secretKey);
                        status = "valid";
                        created_at = (0, moment_timezone_1.default)().format("YYYY-MM-DD HH:mm:ss");
                        return [4 /*yield*/, Token_model_1.default.reissue({
                                currentRefreshToken: currentRefreshToken,
                                refreshToken: refreshToken,
                                accessToken: accessToken,
                                ipAddress: ipAddress,
                                status: status,
                                created_at: created_at,
                            })];
                    case 2:
                        tokenUpdate = _b.sent();
                        if (tokenUpdate[1]) {
                            result = Object.assign({
                                result: true,
                                message: "\uD1A0\uD070 \uC7AC\uBC1C\uAE09\uC774 \uC131\uACF5\uC801\uC73C\uB85C \uC774\uB904\uC84C\uC2B5\uB2C8\uB2E4.",
                                user_id: user_id,
                                accessToken: accessToken,
                                refreshToken: refreshToken,
                            });
                            return [2 /*return*/, result];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return tokenService;
}());
module.exports = tokenService;
