"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //////////
var app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
var fs_1 = __importDefault(require("fs"));
var http_1 = __importDefault(require("http"));
var https_1 = __importDefault(require("https"));
require("dotenv").config();
var PORT = process.env.SERVER_PORT;
var HTTPS_PORT = process.env.HTTPS_SERVER_PORT;
var myUrl = "kdt-ai5-team04.elicecoding.com";
// const app = express();
var privateKey = fs_1.default.readFileSync("/etc/letsencrypt/live/".concat(myUrl, "/privkey.pem"), "utf8");
var certificate = fs_1.default.readFileSync("/etc/letsencrypt/live/".concat(myUrl, "/cert.pem"), "utf8");
var credentials = { key: privateKey, cert: certificate };
var httpServer = http_1.default.createServer(app_1.default);
var httpsServer = https_1.default.createServer(credentials, app_1.default);
httpServer.listen(PORT);
httpsServer.listen(HTTPS_PORT);
// const option = {
//   ca: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/fullchain.pem`),
//   key: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/privkey.pem`),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/cert.pem`),
// };
// // HTTP
// HTTP.createServer(PORT)
//   .listen(PORT, () => {
//     console.log("HTTP 서버가 실행되었습니다. 포트 :: " + PORT);
//   })
//   .on("error", (err: string) => console.log(err));
//   //HTTPS
// HTTPS.createServer(option, app)
//   .listen(HTTPS_PORT, () => {
//     console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + HTTPS_PORT);
//   })
//   .on("error", (err: string) => console.log(err));
// //////////
// ///// 기존 http /////
// import app from "./src/app";
// import "dotenv/config";
// require("dotenv").config();
// const PORT: string = process.env.SERVER_PORT;
// app
//   .listen(PORT, () => {
//     console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
//   })
//   .on("error", (err: string) => console.log(err));
