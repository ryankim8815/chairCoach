"use strict";
// // //////////
// import app from "./src/app";
// import "dotenv/config";
// import fs from "fs";
// import HTTPS from "https";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require("dotenv").config();
// const PORT: string = process.env.SERVER_PORT;
// const myUrl = "kdt-ai5-team04.elicecoding.com";
// // const app = express();
// console.log(
//   "==========================URL",
//   `/etc/letsencrypt/live/${myUrl}/fullchain.pem`
// );
// console.log("BEFORE OPTION");
// const option = {
//   ca: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/fullchain.pem`),
//   key: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/privkey.pem`),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/cert.pem`),
// };
// console.log("BEFORE HTTPS.create....");
// HTTPS.createServer(option, app)
//   .listen(PORT, () => {
//     console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + PORT);
//   })
//   .on("error", (err: string) => console.log(err));
// // //////////
var app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
require("dotenv").config();
var PORT = process.env.SERVER_PORT;
app_1.default
    .listen(PORT, function () {
    console.log("\uC815\uC0C1\uC801\uC73C\uB85C \uC11C\uBC84\uB97C \uC2DC\uC791\uD558\uC600\uC2B5\uB2C8\uB2E4.  http://localhost:".concat(PORT));
})
    .on("error", function (err) { return console.log(err); });
