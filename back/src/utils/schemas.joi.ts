import Joi from "joi";
import * as Users from "./users.joi";
import * as Necks from "./necks.joi";
import * as Bodies from "./bodies.joi";

// userRouter
export const userCurrentSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
});

export const userCreateSchema = Joi.object().keys({
  email: Users.email.required(),
  password: Users.password.required(),
  nickname: Users.nickname.required(),
});

export const userLoginSchema = Joi.object().keys({
  email: Users.email.required(),
  password: Users.password.required(),
});

export const userUpdateSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  currentPassword: Users.password.required(),
  password: Users.password.required(),
  nickname: Users.nickname.required(),
});

export const userDeleteSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  password: Users.password.required(),
});

export const signupEmailSchema = Joi.object().keys({
  email: Users.email.required(),
});

export const verifyEmailSchema = Joi.object().keys({
  email: Users.email.required(),
  code: Users.code.required(),
});

export const signupNicknameSchema = Joi.object().keys({
  nickname: Users.nickname.required(),
});

export const checkPasswordSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  password: Users.password.required(),
});

export const setAlertSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  alert: Users.alert.required(),
  timer: Users.timer.required(),
});

// neckRouter
export const neckResultsSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
});

export const neckResultSchema = Joi.object().keys({
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

// bodyRouter
export const bodyRecordsSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
});

export const bodyCreateSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  tag: Bodies.bodyTag.required(),
});

export const bodyUpdateSchema = Joi.object().keys({
  user_id: Users.user_id.required(),
  body_id: Bodies.body_id.required(),
});

export const bodyRecordsFindByYear = Joi.object().keys({
  year: Bodies.year.required(),
});

export const bodyRecordsFindByWeek = Joi.object().keys({
  week: Bodies.week.required(),
});
