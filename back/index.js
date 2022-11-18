"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./src/app"));
require("dotenv/config");
require("dotenv").config();
var PORT = process.env.SERVER_PORT;
app_1.default
    .listen(PORT, function () {
    console.log("\uC815\uC0C1\uC801\uC73C\uB85C \uC11C\uBC84\uB97C \uC2DC\uC791\uD558\uC600\uC2B5\uB2C8\uB2E4.  http://localhost:".concat(PORT));
})
    .on("error", function (err) { return console.log(err); });
