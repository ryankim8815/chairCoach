"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var socialLoginRouter_1 = __importDefault(require("./routers/socialLoginRouter"));
var neckRouter_1 = __importDefault(require("./routers/neckRouter"));
var bodyRouter_1 = __importDefault(require("./routers/bodyRouter"));
var swagger_1 = __importDefault(require("./utils/swagger"));
var errorMiddleware_1 = require("./middlewares/errorMiddleware");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(userRouter_1.default);
app.use(socialLoginRouter_1.default);
app.use(neckRouter_1.default);
app.use(bodyRouter_1.default);
app.use(swagger_1.default);
// errorHandlers
app.use(errorMiddleware_1.errorHandler);
app.get("/", function (req, res) {
    res.send("안녕하세요, 4팀 backend 서버입니다.");
});
module.exports = app;
