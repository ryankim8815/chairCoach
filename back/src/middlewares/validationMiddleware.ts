import {
  userCurrentSchema,
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
  userDeleteSchema,
  signupEmailSchema,
  verifyEmailSchema,
  signupNicknameSchema,
  checkPasswordSchema,
  setAlertSchema,
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
    return res.status(499).json(result_err);
  }
};

const validateUserCreate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await userCreateSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
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
    return res.status(499).json(result_err);
  }
};

const validateUserUpdate = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await userUpdateSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateUserDelete = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await userDeleteSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateSignupEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await signupEmailSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateVerifyEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.params;
    await verifyEmailSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateSignupNickname = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.params;
    await signupNicknameSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateCheckPassword = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await checkPasswordSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

const validateUserSetAlert = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await setAlertSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

export {
  validateUserCurrent,
  validateUserCreate,
  validateUserLogin,
  validateUserUpdate,
  validateUserDelete,
  validateSignupEmail,
  validateVerifyEmail,
  validateSignupNickname,
  validateCheckPassword,
  validateUserSetAlert,
};
