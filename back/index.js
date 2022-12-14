"use strict";
// // //////////
// import app from "./src/app";
// import "dotenv/config";
// import fs from "fs";
// import http from "http";
// import https from "https";
// const logger = require("./config/logger");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// require("dotenv").config();
// const PORT: string = process.env.SERVER_PORT;
// const HTTPS_PORT: string = process.env.HTTPS_SERVER_PORT;
// const myUrl = "kdt-ai5-team04.elicecoding.com";
// // const app = express();
// const privateKey = fs.readFileSync(
//   `/etc/letsencrypt/live/${myUrl}/privkey.pem`,
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   `/etc/letsencrypt/live/${myUrl}/cert.pem`,
//   "utf8"
// );
// const credentials = { key: privateKey, cert: certificate };
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
// httpServer.listen(PORT);
// httpsServer.listen(HTTPS_PORT);
///// 기존 http /////
var app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
require("dotenv").config();
var PORT = process.env.SERVER_PORT;
app_1.default
    .listen(PORT, function () {
    console.log("\uC815\uC0C1\uC801\uC73C\uB85C \uC11C\uBC84\uB97C \uC2DC\uC791\uD558\uC600\uC2B5\uB2C8\uB2E4.  http://localhost:".concat(PORT));
})
    .on("error", function (err) { return console.log(err); });
