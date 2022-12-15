import Joi from "joi";
import * as regexp from "./regularExpression";

const user_id = Joi.string();
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: {
    allow: ["com", "net"],
  },
});

const password = Joi.string().pattern(new RegExp(regexp.password)); // 최소 8 자, 최소 하나의 문자, 하나의 숫자 및 하나의 특수 문자
const nickname = Joi.string().pattern(new RegExp(regexp.nickname)); // 한글+숫자 2~8 | 영어+숫자 2~12 - FE에서 보여지는 길이 기준
const provider = Joi.string();
const alert = Joi.boolean();
const timer = Joi.number().integer();
const code = Joi.string().pattern(new RegExp(regexp.emailCode));

export { user_id, email, password, nickname, provider, alert, timer, code };
