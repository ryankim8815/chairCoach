import Joi from "joi";

export const bodyRecordsSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});

export const bodyCreateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  tag: Joi.string().required(),
});

export const bodyUpdateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  body_id: Joi.string().required(),
});
