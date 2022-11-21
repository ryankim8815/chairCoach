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
////////// Multer로 인한 이슈 발생 //////////
exports.neckResultSchema = joi_1.default.object().keys({
    //   user_id: Joi.string().required(),
    //   user_id: Joi.number().required(), // test용
    result: joi_1.default.number().required(),
    score: joi_1.default.number().integer().required(), // int
});
exports.fileSchema = joi_1.default.object().keys({
    //   file: Joi.number().required(),
    fieldname: joi_1.default.string().valid("file"), // "file",
    //   originalname: "default.png",
    //   encoding: "7bit",
    //   mimetype: "image/png",
    //   destination: "./uploads",
    //   filename: "file-1669021214727-43580897.png",
    //   path: "uploads/file-1669021214727-43580897.png",
    //   size: 6650,
});
