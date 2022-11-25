import {
  neckResultsSchema,
  neckResultSchema,
  fileSchema,
} from "../utils/neckSchemas.joi";
import * as express from "express";

const validateNeckResults = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await neckResultsSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err);
    return res.status(499).json(result_err);
  }
};

const validateNeckResult = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    const file = req.file;
    await neckResultSchema.validateAsync(body);
    await fileSchema.validateAsync(file);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err, err);
    return res.status(499).json(result_err);
  }
};

export { validateNeckResults, validateNeckResult };