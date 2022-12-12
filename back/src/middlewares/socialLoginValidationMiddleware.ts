import { codeSchema } from "../utils/socialLoginSchemas.joi";
import * as express from "express";

const validateCode = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    await codeSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    return res.status(499).json(result_err);
  }
};

export { validateCode };
