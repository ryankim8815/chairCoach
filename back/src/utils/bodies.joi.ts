import Joi from "joi";
// import * as regexp from "./regularExpression";

const bodyTag = Joi.string();
const body_id = Joi.string();
const year = Joi.number().integer();
const week = Joi.number().integer().min(0).max(53);

export { bodyTag, body_id, year, week };
