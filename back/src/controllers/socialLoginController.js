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
var axios_1 = __importDefault(require("axios"));
var socialLoginService_1 = __importDefault(require("../services/socialLoginService"));
var nullPrototypeHandler_1 = require("../utils/nullPrototypeHandler");
var qs_1 = __importDefault(require("qs"));
var urlencode_1 = __importDefault(require("urlencode"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var logger = require("../config/logger");
// axios에서 error 발생시 troubleshooting 용이성을 위해
axios_1.default.interceptors.response.use(function (res) {
    return res.data;
}, function (err) {
    // console.log(err);
    // throw new Error("(!) axios error");
    throw new Error("(!) axios error: ".concat(err));
});
// formdata 포멧으로 만들어 줌
var makeFormData = function (params) {
    var searchParams = new URLSearchParams();
    Object.keys(params).forEach(function (key) {
        searchParams.append(key, params[key]);
    });
    return searchParams;
};
var socialLoginController = /** @class */ (function () {
    function socialLoginController() {
    }
    ////////////////////////////////////////
    /////////////  카  카  오  ///////////////
    ////////////////////////////////////////
    // POST: kakao api 회원가입 & 로그인
    socialLoginController.kakaoOauth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var code, REST_API_KEY, REDIRECT_URI, resultToken, _a, access_token, resultAccount, _b, email, kakao, e_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        code = req.body.code;
                        REST_API_KEY = process.env.KAKAO_REST_API_KEY;
                        REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 5, , 6]);
                        _a = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "POST",
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                                },
                                url: "https://kauth.kakao.com/oauth/token",
                                data: makeFormData({
                                    grant_type: "authorization_code",
                                    client_id: REST_API_KEY,
                                    redirect_uri: REDIRECT_URI,
                                    code: code,
                                }),
                            })];
                    case 2:
                        resultToken = _a.apply(void 0, [_c.sent()]);
                        access_token = resultToken.access_token;
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "GET",
                                headers: {
                                    Authorization: "bearer ".concat(access_token),
                                },
                                url: "https://kapi.kakao.com/v1/oidc/userinfo",
                            })];
                    case 3:
                        resultAccount = _b.apply(void 0, [_c.sent()]);
                        email = resultAccount.email;
                        return [4 /*yield*/, socialLoginService_1.default.kakao({
                                email: email,
                                access_token: access_token,
                            })];
                    case 4:
                        kakao = _c.sent();
                        logger.info(kakao);
                        return [2 /*return*/, res.status(200).json(kakao)];
                    case 5:
                        e_1 = _c.sent();
                        next(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////  네  이  버  ///////////////
    ////////////////////////////////////////
    socialLoginController.naverOauth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var code, state, client_id, client_secret, redirectURI, encoded, url, resultToken, _a, access_token, resultAccount, _b, naverUserResult, email, naver, _c, e_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        code = req.body.code;
                        state = process.env.NAVER_STATE;
                        client_id = process.env.NAVER_CLIENT_ID;
                        client_secret = process.env.NAVER_CLIENT_SECRET;
                        redirectURI = process.env.NAVER_REDIRECT_URL;
                        encoded = encodeURIComponent(redirectURI);
                        url = "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=".concat(client_id, "&client_secret=").concat(client_secret, "&redirect_uri=").concat(encoded, "&code=").concat(code, "&state=").concat(state);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        _a = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "GET",
                                url: url,
                            })];
                    case 2:
                        resultToken = _a.apply(void 0, [_d.sent()]);
                        access_token = resultToken.access_token;
                        _b = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "GET",
                                headers: {
                                    Authorization: "bearer ".concat(access_token),
                                },
                                url: "https://openapi.naver.com/v1/nid/me",
                            })];
                    case 3:
                        resultAccount = _b.apply(void 0, [_d.sent()]);
                        naverUserResult = resultAccount.response;
                        email = naverUserResult.email;
                        _c = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, socialLoginService_1.default.naver({
                                email: email,
                                access_token: access_token,
                            })];
                    case 4:
                        naver = _c.apply(void 0, [_d.sent()]);
                        logger.info(naver);
                        return [2 /*return*/, res.status(200).json(naver)];
                    case 5:
                        e_2 = _d.sent();
                        next(e_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ////////////////////////////////////////
    /////////////   구   글   ///////////////
    ////////////////////////////////////////
    socialLoginController.googleOauth = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var code, login_hint, nonce, state, client_id, client_secret, redirectURI, hd, encoded, data, resultToken, _a, jwtDecoded, email, refresh_token, google, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        code = urlencode_1.default.decode(req.body.code);
                        login_hint = req.body.email || null;
                        nonce = req.body.nonce;
                        state = process.env.GOOGLE_STATE;
                        client_id = process.env.GOOGLE_CLIENT_ID;
                        client_secret = process.env.GOOGLE_CLIENT_SECRET;
                        redirectURI = process.env.GOOGLE_REDIRECT_URL;
                        hd = process.env.GOOGLE_HD;
                        encoded = encodeURIComponent(redirectURI);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        data = {
                            code: code,
                            client_id: client_id,
                            client_secret: client_secret,
                            redirect_uri: redirectURI,
                            grant_type: "authorization_code",
                        };
                        _a = nullPrototypeHandler_1.nullPrototypeHandler;
                        return [4 /*yield*/, (0, axios_1.default)({
                                method: "POST",
                                headers: { "content-type": "application/x-www-form-urlencoded" },
                                data: qs_1.default.stringify(data),
                                url: "https://oauth2.googleapis.com/token",
                            })];
                    case 2:
                        resultToken = _a.apply(void 0, [_b.sent()]);
                        jwtDecoded = (0, nullPrototypeHandler_1.nullPrototypeHandler)(jsonwebtoken_1.default.decode(resultToken.id_token));
                        email = jwtDecoded.email;
                        refresh_token = resultToken.refresh_token;
                        return [4 /*yield*/, socialLoginService_1.default.google({
                                email: email,
                                refresh_token: refresh_token,
                            })];
                    case 3:
                        google = _b.sent();
                        logger.info(google);
                        return [2 /*return*/, res.status(200).json(google)];
                    case 4:
                        e_3 = _b.sent();
                        next(e_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return socialLoginController;
}());
module.exports = socialLoginController;
