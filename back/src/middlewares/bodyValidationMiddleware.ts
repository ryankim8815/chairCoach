import {
  bodyRecordsSchema,
  bodyCreateSchema,
  bodyUpdateSchema,
} from "../utils/bodySchemas.joi";
import * as express from "express";

const validateBodyRecords = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await bodyRecordsSchema.validateAsync(body);
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

const validateBodyCreate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await bodyCreateSchema.validateAsync(body);
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

const validateBodyUpdate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await bodyUpdateSchema.validateAsync(body);
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

export { validateBodyRecords, validateBodyCreate, validateBodyUpdate };
