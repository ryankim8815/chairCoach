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
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var models_1 = require("./models");
var clientIpMiddleware_1 = __importDefault(require("./middlewares/clientIpMiddleware"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var socialLoginRouter_1 = __importDefault(require("./routers/socialLoginRouter"));
var neckRouter_1 = __importDefault(require("./routers/neckRouter"));
var bodyRouter_1 = __importDefault(require("./routers/bodyRouter"));
var tokenRouter_1 = __importDefault(require("./routers/tokenRouter"));
var swagger_1 = __importDefault(require("./utils/swagger"));
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var logger = require("./config/logger");
var client = require("./discord/index");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(clientIpMiddleware_1.default);
app.use(userRouter_1.default);
app.use(socialLoginRouter_1.default);
app.use(neckRouter_1.default);
app.use(bodyRouter_1.default);
app.use(tokenRouter_1.default);
app.use(swagger_1.default);
// uploads
app.use(express_1.default.static("uploads"));
// errorHandlers
app.use(errorMiddleware_1.errorHandler);
app.get("/", function (req, res) {
    res.send("안녕하세요, 4팀 backend 서버입니다.");
});
models_1.db.sequelize
    .sync({ alter: { drop: false } })
    .then(function () {
    logger.info("sequelize.sync: success");
    console.log("DB 테스트 성공");
})
    .catch(function (error) {
    logger.error("sequelize.sync:", error);
    console.error("DB 테스트 실패:", error);
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, models_1.db.sequelize.authenticate()];
            case 1:
                _a.sent();
                logger.info("sequelize.authenticate: success");
                console.log("데이터베이스 연결 성공");
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger.error("sequelize.authenticate:", error_1);
                console.error("데이터베이스 오류:", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
module.exports = app;
