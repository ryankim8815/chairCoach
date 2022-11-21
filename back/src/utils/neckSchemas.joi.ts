import Joi from "joi";

export const neckResultsSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  //   user_id: Joi.number().required(), // test용
});

////////// Multer로 인한 이슈 발생 //////////
export const neckResultSchema = Joi.object().keys({
  //   user_id: Joi.string().required(),
  //   user_id: Joi.number().required(), // test용
  result: Joi.number().required(), // float
  score: Joi.number().integer().required(), // int
});
export const fileSchema = Joi.object().keys({
  //   file: Joi.number().required(),
  fieldname: Joi.string().valid("file"), // "file",
  //   originalname: "default.png",
  //   encoding: "7bit",
  //   mimetype: "image/png",
  //   destination: "./uploads",
  //   filename: "file-1669021214727-43580897.png",
  //   path: "uploads/file-1669021214727-43580897.png",
  //   size: 6650,
});
