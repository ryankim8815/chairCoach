import Joi from "joi";

export const userCurrentSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  //   user_id: Joi.number().required(), // test
});

export const userUpdateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  currentPassword: Joi.string().required(),
  password: Joi.string().required(),
  nickname: Joi.string().required(),
  //   user_id: Joi.number().required(), // test
});

export const userDeleteSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  password: Joi.string().required(),
  //   password: Joi.number().required(),
  //   user_id: Joi.number().required(), // test
});
