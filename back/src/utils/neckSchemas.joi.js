"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSchema = exports.neckResultSchema = exports.neckResultsSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.neckResultsSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test용
});
exports.neckResultSchema = joi_1.default.object().keys({
    user_id: joi_1.default.string().required(),
    //   user_id: Joi.number().required(), // test용
    result: joi_1.default.number().required(),
    score: joi_1.default.number().integer().required(), // int
});
exports.fileSchema = joi_1.default.object().keys({
    fieldname: joi_1.default.string().valid("file").required(),
    originalname: joi_1.default.string()
        .pattern(new RegExp("^([\\ \\S]+(\\.(jpg|png|gif|bmp))$)"))
        .required(),
    encoding: joi_1.default.string().valid("7bit").required(),
    mimetype: joi_1.default.string()
        .valid("image/png" || "image/jpg" || "image/jpeg")
        .required(),
    destination: joi_1.default.string().valid("./uploads").required(),
    filename: joi_1.default.string().required(),
    path: joi_1.default.string().required(),
    size: joi_1.default.number()
        .max(1024 * 1000 * 5)
        .required(), // 5mb 이하
});
