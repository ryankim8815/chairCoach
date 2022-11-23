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
    // .pattern(new RegExp("^[A-Za-z0-9_-]{2,10}$")) // 최소 2~10 자, 영어 숫자 // FE에서 url에서 활용하지 않는다고 해서 주석처리함
    .min(3) // FE에서 확정전 임의 값
    .max(10) // FE에서 확정전 임의 값
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
    // .pattern(new RegExp("^[A-Za-z0-9_-]{2,10}$")) // 최소 2~10 자, 영어 숫자 // FE에서 url에서 활용하지 않는다고 해서 주석처리함
    .min(3) // FE에서 확정전 임의 값
    .max(10) // FE에서 확정전 임의 값
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
