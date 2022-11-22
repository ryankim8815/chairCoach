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
    // const body = req;
    // console.log("REQQQQ: ", req);
    await neckResultsSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err);
    // res.status(200).json(result_err);
    res.status(499).json(result_err);
  }
};

////////// Multer로 인한 이슈 발생 //////////
const validateNeckResult = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    console.log("REQ: ", req);
    const body = req.body;
    const file = req.file;
    await neckResultSchema.validateAsync(body);
    await fileSchema.validateAsync(file);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다." + err,
    };
    console.log(result_err, err);
    // res.status(200).json(result_err);
    res.status(499).json(result_err);
  }
};

export { validateNeckResults, validateNeckResult };
