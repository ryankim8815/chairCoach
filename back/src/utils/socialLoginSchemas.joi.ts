import Joi from "joi";

export const codeSchema = Joi.object().keys({
  code: Joi.string().required(),
});
