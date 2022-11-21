import {
  userCurrentSchema,
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
  userDeleteSchema,
} from "../utils/schemas.joi";
import * as express from "express";

const validateUserCurrent = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await userCurrentSchema.validateAsync(body);
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

const validateUserCreate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    // console.log("req: ", req);
    // console.log("typeof req: ", typeof req);
    // console.log("req.body.user_id: ", req.body.user_id);
    // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
    await userCreateSchema.validateAsync(body);
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

const validateUserLogin = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await userLoginSchema.validateAsync(body);
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

const validateUserUpdate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    // console.log("req: ", req);
    // console.log("typeof req: ", typeof req);
    // console.log("req.body.user_id: ", req.body.user_id);
    // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
    await userUpdateSchema.validateAsync(body);
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

const validateUserDelete = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    // console.log("req: ", req);
    // console.log("typeof req: ", typeof req);
    // console.log("req.body.user_id: ", req.body.user_id);
    // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
    await userDeleteSchema.validateAsync(body);
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

// export = validationMiddleware;
export {
  validateUserCurrent,
  validateUserCreate,
  validateUserLogin,
  validateUserUpdate,
  validateUserDelete,
};
