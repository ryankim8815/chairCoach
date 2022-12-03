"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyUpdateSchema = exports.bodyCreateSchema = exports.bodyRecordsSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.bodyRecordsSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
});
exports.bodyCreateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    tag: joi_1.default.string().required(),
});
exports.bodyUpdateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    body_id: joi_1.default.string().required(),
});
