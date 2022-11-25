import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import appRoot from "app-root-path";
import process from "process";

const logDir = `${appRoot}/logs`; // logs 디렉토리 하위에 로그 파일 저장
const { combine, timestamp, label, printf } = winston.format;

const logFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`; // log 출력 포맷
});

/**
 * Log level - 0 to 2
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug:5, silly: 6
 */

const logger = winston.createLogger({
  //   level: "info",
  //   format: winston.format.json(),
  //   defaultMeta: { service: "user-service" },
  format: combine(
    label({
      label: "ChairCoachLog",
    }),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    // info level log
    new winstonDaily({
      level: "info", // info 이상 모든 0, 1, 2
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30days
      zippedArchive: true,
    }),
    // error level log
    new winstonDaily({
      level: "error", // error 이상 모든 0
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.error.log`,
      maxFiles: 30, // 30days
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
    new winstonDaily({
      level: "error", // error 이상 모든 0
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.exception.log`,
      maxFiles: 30, // 30days
      zippedArchive: true,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      //   format: winston.format.simple(),
      format: winston.format.combine(
        winston.format.colorize(), // color
        winston.format.simple() // format
      ),
    })
  );
}

module.exports = logger;
