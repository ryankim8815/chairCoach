"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var multer_1 = __importDefault(require("multer"));
var fileFilter = function (req, file, cb) {
    if (file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/gif") {
        cb(null, true);
    }
    else {
        cb(null, false);
        cb(new Error("Only .png, .gif, .jpg and .jpeg format allowed!"));
    }
};
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        var originalname = file.originalname.split(".");
        var ext = originalname[originalname.length - 1];
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        req.body = JSON.parse(JSON.stringify(req.body));
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1000 * 5, // 5mb 이하
    },
    fileFilter: fileFilter,
});
var uploadFile = upload.single("file");
var uploadMiddleware = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        uploadFile(req, res, function (err) {
            if (err) {
                // An unknown error occurred when uploading. - from middleware
                var result_err = {
                    result: false,
                    cause: "file",
                    message: "파일 업로드 중 오류가 발생했습니다. 파일 제한 조건을 확인해주세요.",
                };
                console.log(result_err);
                return res.status(200).json(result_err);
            }
            // Everything went fine.
            next();
        });
        return [2 /*return*/];
    });
}); };
module.exports = uploadMiddleware;
