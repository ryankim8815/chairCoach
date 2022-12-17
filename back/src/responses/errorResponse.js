"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerError = exports.typeError = exports.common = void 0;
exports.common = {
    result: false,
    status: 400,
    message: "알 수 없는 오류가 발생했습니다.",
};
exports.typeError = {
    result: false,
    status: 400,
    message: "type이 올바르지 않습니다.",
};
exports.multerError = {
    result: false,
    status: 400,
    message: "파일 제한 조건을 확인해주세요.",
};
