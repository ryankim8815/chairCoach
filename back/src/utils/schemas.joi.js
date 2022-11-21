"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDeleteSchema = exports.userUpdateSchema = exports.userCurrentSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.userCurrentSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test
});
exports.userUpdateSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    currentPassword: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    nickname: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test
});
exports.userDeleteSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    //   password: Joi.number().required(),
    //   user_id: Joi.number().required(), // test
});
