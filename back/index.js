"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// //////////
var app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
var fs_1 = __importDefault(require("fs"));
var https_1 = __importDefault(require("https"));
require("dotenv").config();
var PORT = process.env.SERVER_PORT;
var myUrl = "kdt-ai5-team04.elicecoding.com";
// const app = express();
console.log("==========================URL", "/etc/letsencrypt/live/".concat(myUrl, "/fullchain.pem"));
console.log("BEFORE OPTION");
var option = {
    ca: fs_1.default.readFileSync("/etc/letsencrypt/live/".concat(myUrl, "/fullchain.pem")),
    key: fs_1.default.readFileSync("/etc/letsencrypt/live/".concat(myUrl, "/privkey.pem")),
    cert: fs_1.default.readFileSync("/etc/letsencrypt/live/".concat(myUrl, "/cert.pem")),
};
console.log("BEFORE HTTPS.create....");
https_1.default.createServer(option, app_1.default)
    .listen(PORT, function () {
    console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + PORT);
})
    .on("error", function (err) { return console.log(err); });
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
