import Joi from "joi";

const requestClientIp = Joi.string();
// const requestStartTime = Joi.date().timestamp();
const requestStartTime = Joi.string();

export { requestClientIp, requestStartTime };
