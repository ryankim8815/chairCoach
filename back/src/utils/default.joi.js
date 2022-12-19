"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestStartTime = exports.requestClientIp = void 0;
var joi_1 = __importDefault(require("joi"));
var requestClientIp = joi_1.default.string();
exports.requestClientIp = requestClientIp;
// const requestStartTime = Joi.date().timestamp();
var requestStartTime = joi_1.default.string();
exports.requestStartTime = requestStartTime;
