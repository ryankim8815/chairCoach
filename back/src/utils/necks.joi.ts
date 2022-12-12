import Joi from "joi";
import * as regexp from "./regularExpression";

const neckResult = Joi.number(); // 미정 - ai 모델이 나와야 확정 가능
const neckScore = Joi.number().integer(); // 미정 - ai 모델이 나와야 확정 가능
const multerFieldname = Joi.string().valid("file");
const multerOriginalname = Joi.string().pattern(
  new RegExp(regexp.imageFiltename)
);
const multerEncoding = Joi.string().valid("7bit"); // "7bit",
const multerMimetype = Joi.alternatives().try(
  Joi.string().valid("image/png"),
  Joi.string().valid("image/jpg"),
  Joi.string().valid("image/jpeg"),
  Joi.string().valid("image/gif")
); //"image/png",
const multerDestination = Joi.string().valid("./uploads"); // "./uploads",
const multerFilename = Joi.string(); // "file-1669021214727-43580897.png",
const multerPath = Joi.string(); // "uploads/file-1669021214727-43580897.png",
const multerSize = Joi.number().max(1024 * 1000 * 5); // 5mb 이하
const year = Joi.number().integer();
export {
  neckResult,
  neckScore,
  multerFieldname,
  multerOriginalname,
  multerEncoding,
  multerMimetype,
  multerDestination,
  multerFilename,
  multerPath,
  multerSize,
  year,
};
