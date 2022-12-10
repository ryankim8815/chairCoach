import Joi from "joi";
// import * as regexp from "./regularExpression";

const bodyTag = Joi.string();
const body_id = Joi.string();
const week = Joi.number().integer().max(53);
const year = Joi.number().integer();

export { bodyTag, body_id, week, year };
