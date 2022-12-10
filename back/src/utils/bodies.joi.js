"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.year = exports.week = exports.body_id = exports.bodyTag = void 0;
var joi_1 = __importDefault(require("joi"));
// import * as regexp from "./regularExpression";
var bodyTag = joi_1.default.string();
exports.bodyTag = bodyTag;
var body_id = joi_1.default.string();
exports.body_id = body_id;
var week = joi_1.default.number().integer().max(53);
exports.week = week;
var year = joi_1.default.number().integer();
exports.year = year;
