"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalServerError = void 0;
var internalServerError = function (message) { return ({
    result: false,
    status: 500,
    message: message,
}); };
exports.internalServerError = internalServerError;
