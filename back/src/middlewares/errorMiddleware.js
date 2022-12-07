"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var logger = require("../../config/logger");
function errorHandler(error, // 적절한 타입 찾기
req, res, next) {
    var result = {
        result: false,
        message: error.message,
    };
    logger.error(result);
    return res.status(400).json(result);
}
exports.errorHandler = errorHandler;
