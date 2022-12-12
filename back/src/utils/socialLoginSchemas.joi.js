"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.codeSchema = joi_1.default.object().keys({
    code: joi_1.default.string().required(),
});
