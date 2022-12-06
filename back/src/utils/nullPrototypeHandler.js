"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullPrototypeHandler = void 0;
var nullPrototypeHandler = function (object) {
    var jsonString = JSON.stringify(object);
    var jsonObject = JSON.parse(jsonString);
    return jsonObject;
};
exports.nullPrototypeHandler = nullPrototypeHandler;
