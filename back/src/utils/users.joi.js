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
exports.code = exports.timer = exports.alert = exports.provider = exports.nickname = exports.password = exports.email = exports.user_id = void 0;
var joi_1 = __importDefault(require("joi"));
var regexp = __importStar(require("./regularExpression"));
var user_id = joi_1.default.string();
exports.user_id = user_id;
var email = joi_1.default.string().email({
    minDomainSegments: 2,
    tlds: {
        allow: ["com", "net"],
    },
});
exports.email = email;
var password = joi_1.default.string().pattern(new RegExp(regexp.password)); // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
exports.password = password;
var nickname = joi_1.default.string().pattern(new RegExp(regexp.nickname)); // 한글+숫자 2~8 | 영어+숫자 2~12 - FE에서 보여지는 길이 기준
exports.nickname = nickname;
var provider = joi_1.default.string();
exports.provider = provider;
var alert = joi_1.default.boolean();
exports.alert = alert;
var timer = joi_1.default.number().integer();
exports.timer = timer;
var code = joi_1.default.string().pattern(new RegExp(regexp.emailCode));
exports.code = code;
