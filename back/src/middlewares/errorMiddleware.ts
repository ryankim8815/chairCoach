import * as express from "express";
const logger = require("../../config/logger");

function errorHandler(
  error: any, // 적절한 타입 찾기
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const result = {
    result: false,
    message: error.message,
  };
  logger.error(result);
  return res.status(400).json(result);
}

export { errorHandler };
