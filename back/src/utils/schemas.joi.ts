import Joi from "joi";

export const userCurrentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});

export const userCreateSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
  nickname: Joi.string()
    .pattern(new RegExp("^([ㄱ-힣0-9_-]{2,8}|[A-Za-z0-9_-]{2,12})$")) // 한글+숫자 2~8 | 영어+숫자 2~12 - FE에서 보여지는 길이 기준
    .required(),
});

export const userLoginSchema = Joi.object().keys({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .required(),
  password: Joi.string().required(),
});

export const userUpdateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  currentPassword: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
  nickname: Joi.string()
    .pattern(new RegExp("^([ㄱ-힣0-9_-]{2,8}|[A-Za-z0-9_-]{2,12})$")) // 한글+숫자 2~8 | 영어+숫자 2~12 - FE에서 보여지는 길이 기준
    .required(),
});

export const userDeleteSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      )
    )
    .required(), // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
});
