"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var app_root_path_1 = __importDefault(require("app-root-path"));
var process_1 = __importDefault(require("process"));
var logDir = "".concat(app_root_path_1.default, "/logs"); // logs 디렉토리 하위에 로그 파일 저장
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, printf = _a.printf;
var logFormat = printf(function (_a) {
    var level = _a.level, message = _a.message, label = _a.label, timestamp = _a.timestamp;
    return "".concat(timestamp, " [").concat(label, "] ").concat(level, ": ").concat(message); // log 출력 포맷
});
/**
 * Log level - 0 to 2
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug:5, silly: 6
 */
var logger = winston_1.default.createLogger({
    //   level: "info",
    //   format: winston.format.json(),
    //   defaultMeta: { service: "user-service" },
    format: combine(label({
        label: "ChairCoachLog",
    }), timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), logFormat),
    transports: [
        // info level log
        new winston_daily_rotate_file_1.default({
            level: "info",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
        // error level log
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.error.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        // new winston.transports.File({ filename: "error.log", level: "error" }),
        // new winston.transports.File({ filename: "combined.log" }),
    ],
    exceptionHandlers: [
        // uncaughtException
        new winston_daily_rotate_file_1.default({
            level: "error",
            datePattern: "YYYY-MM-DD",
            dirname: logDir,
            filename: "%DATE%.exception.log",
            maxFiles: 30,
            zippedArchive: true,
        }),
    ],
});
//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process_1.default.env.NODE_ENV !== "production") {
    logger.add(new winston_1.default.transports.Console({
        //   format: winston.format.simple(),
        format: winston_1.default.format.combine(winston_1.default.format.colorize(), // color
        winston_1.default.format.simple() // format
        ),
    }));
}
module.exports = logger;
