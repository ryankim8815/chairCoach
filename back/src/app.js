"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var socialLoginRouter_1 = __importDefault(require("./routers/socialLoginRouter"));
var neckRouter_1 = __importDefault(require("./routers/neckRouter"));
var swagger_1 = __importDefault(require("./utils/swagger"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
//application/json의 Content-Type에 대해 파싱해주는 역할 - req.body에 접근 가능
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(userRouter_1.default);
app.use(socialLoginRouter_1.default);
app.use(neckRouter_1.default);
app.use(swagger_1.default);
// 기본 페이지
app.get("/", function (req, res) {
    res.send("안녕하세요, 4팀 backend 서버입니다.");
});
module.exports = app;
