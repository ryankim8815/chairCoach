"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, "uploads/");
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        var originalname = file.originalname.split(".");
        var ext = originalname[originalname.length - 1];
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
    },
});
var upload = (0, multer_1.default)({ storage: storage });
module.exports = upload;
