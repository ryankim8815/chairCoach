"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.year = exports.multerSize = exports.multerPath = exports.multerFilename = exports.multerDestination = exports.multerMimetype = exports.multerEncoding = exports.multerOriginalname = exports.multerFieldname = exports.neckScore = exports.neckResult = void 0;
var joi_1 = __importDefault(require("joi"));
var regexp = __importStar(require("./regularExpression"));
var neckResult = joi_1.default.number(); // 미정 - ai 모델이 나와야 확정 가능
exports.neckResult = neckResult;
var neckScore = joi_1.default.number().integer(); // 미정 - ai 모델이 나와야 확정 가능
exports.neckScore = neckScore;
var multerFieldname = joi_1.default.string().valid("file");
exports.multerFieldname = multerFieldname;
var multerOriginalname = joi_1.default.string().pattern(new RegExp(regexp.imageFiltename));
exports.multerOriginalname = multerOriginalname;
var multerEncoding = joi_1.default.string().valid("7bit"); // "7bit",
exports.multerEncoding = multerEncoding;
var multerMimetype = joi_1.default.alternatives().try(joi_1.default.string().valid("image/png"), joi_1.default.string().valid("image/jpg"), joi_1.default.string().valid("image/jpeg"), joi_1.default.string().valid("image/gif")); //"image/png",
exports.multerMimetype = multerMimetype;
var multerDestination = joi_1.default.string().valid("./uploads"); // "./uploads",
exports.multerDestination = multerDestination;
var multerFilename = joi_1.default.string(); // "file-1669021214727-43580897.png",
exports.multerFilename = multerFilename;
var multerPath = joi_1.default.string(); // "uploads/file-1669021214727-43580897.png",
exports.multerPath = multerPath;
var multerSize = joi_1.default.number().max(1024 * 1000 * 5); // 5mb 이하
exports.multerSize = multerSize;
var year = joi_1.default.number().integer();
exports.year = year;
