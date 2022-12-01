import * as express from "express";
import Joi from "joi";

const validateBody = (Schema: Joi.ObjectSchema<any>) =>
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      await Schema.validateAsync(body);
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

const validateParams = (Schema: Joi.ObjectSchema<any>) =>
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const params = req.params;
      await Schema.validateAsync(params);
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

const validateBodyMulter = (
  bodySchema: Joi.ObjectSchema<any>,
  multerSchema: Joi.ObjectSchema<any>
) =>
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const file = req.file;
      await bodySchema.validateAsync(body);
      await multerSchema.validateAsync(file);
      next();
    } catch (err) {
      const result_err = {
        result: false,
        cause: "type",
        message: "api 요청시 잘못된 type이 첨부되었습니다." + err,
      };
      return res.status(499).json(result_err);
    }
  };

export { validateBody, validateParams, validateBodyMulter };
