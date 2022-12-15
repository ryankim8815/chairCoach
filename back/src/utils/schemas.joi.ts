import Joi from "joi";
import * as Default from "./default.joi";
import * as Users from "./users.joi";
import * as Necks from "./necks.joi";
import * as Bodies from "./bodies.joi";

// socialLoginRouter
export const codeSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  code: Joi.string().required(),
});

// userRouter
export const userCurrentSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
});

export const userCreateSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  email: Users.email.required(),
  password: Users.password.required(),
  nickname: Users.nickname.required(),
});

export const userLoginSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  email: Users.email.required(),
  password: Users.password.required(),
});

export const userUpdateSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  password: Users.password.required(),
  nickname: Users.nickname.required(),
});

export const socialLoginUserUpdateSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  nickname: Users.nickname.required(),
});

export const socialLoginUserUpdateSchemaParams = Joi.object().keys({
  user_id: Users.user_id.required(),
  provider: Users.provider.required(),
});

export const userDeleteSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  password: Users.password.required(),
});

export const signupEmailSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  email: Users.email.required(),
});

export const verifyEmailSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  email: Users.email.required(),
  code: Users.code.required(),
});

export const signupNicknameSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  nickname: Users.nickname.required(),
});

export const checkPasswordSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  password: Users.password.required(),
});

export const setAlertSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  alert: Users.alert.required(),
  timer: Users.timer.required(),
});

// neckRouter
export const neckResultsSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
});

export const neckResultSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  result: Necks.neckResult.required(),
  score: Necks.neckScore.required(),
});
export const fileSchema = Joi.object().keys({
  fieldname: Necks.multerFieldname.required(),
  originalname: Necks.multerOriginalname.required(),
  encoding: Necks.multerEncoding.required(),
  mimetype: Necks.multerMimetype.required(),
  destination: Necks.multerDestination.required(),
  filename: Necks.multerFilename.required(),
  path: Necks.multerPath.required(),
  size: Necks.multerSize.required(),
});
export const neckRecordsFindByYear = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  year: Necks.year.required(),
});

// bodyRouter
export const bodyRecordsSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
});

export const bodyCreateSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  tag: Bodies.bodyTag.required(),
});

export const bodyUpdateSchema = Joi.object().keys({
  requestClientIp: Default.requestClientIp,
  requestStartTime: Default.requestStartTime,

  user_id: Users.user_id.required(),
  body_id: Bodies.body_id.required(),
});

export const bodyRecordsFindByWeek = Joi.object().keys({
  user_id: Users.user_id.required(),
  week: Bodies.week.required(),
  year: Bodies.year.required(),
});

export const bodyRecordsFindByYear = Joi.object().keys({
  user_id: Users.user_id.required(),
  year: Bodies.year.required(),
});
