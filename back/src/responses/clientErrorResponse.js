"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conflict = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = void 0;
var badRequest = function (message) { return ({
    result: false,
    status: 400,
    message: message,
}); };
exports.badRequest = badRequest;
var unauthorized = function (message) { return ({
    result: false,
    status: 401,
    message: message,
}); };
exports.unauthorized = unauthorized;
var forbidden = function (message) { return ({
    result: false,
    status: 403,
    message: message,
}); };
exports.forbidden = forbidden;
var notFound = function (message) { return ({
    result: false,
    status: 404,
    message: message,
}); };
exports.notFound = notFound;
var conflict = function (message) { return ({
    result: false,
    status: 409,
    message: message,
}); };
exports.conflict = conflict;
