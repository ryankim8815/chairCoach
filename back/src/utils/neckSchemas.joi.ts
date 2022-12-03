import Joi from "joi";

export const neckResultsSchema = Joi.object().keys({
  user_id: Joi.string().required(),
});

export const neckResultSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  result: Joi.number().required(), // float
  score: Joi.number().integer().required(), // int
});
export const fileSchema = Joi.object().keys({
  fieldname: Joi.string().valid("file").required(), // "file",
  originalname: Joi.string()
    .pattern(new RegExp("^([\\ \\S]+(\\.(png|jpg|jpeg|gif))$)"))
    .required(), // "default.png", 공백을 포함한 파일명 가능
  encoding: Joi.string().valid("7bit").required(), // "7bit",
  mimetype: Joi.string()
    .valid("image/png" || "image/jpg" || "image/jpeg" || "image/gif")
    .required(), //"image/png",
  destination: Joi.string().valid("./uploads").required(), // "./uploads",
  filename: Joi.string().required(), // "file-1669021214727-43580897.png",
  path: Joi.string().required(), // "uploads/file-1669021214727-43580897.png",
  size: Joi.number()
    .max(1024 * 1000 * 5)
    .required(), // 5mb 이하
});
