import * as express from "express";
import Joi from "joi";
import { typeError } from "../responses/errorResponse";

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
    } catch (e) {
      next(typeError);
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
    } catch (e) {
      next(typeError);
    }
  };

const validateBodyParams = (
  bodySchema: Joi.ObjectSchema<any>,
  paramsSchema: Joi.ObjectSchema<any>
) =>
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const params = req.params;
      await bodySchema.validateAsync(body);
      await paramsSchema.validateAsync(params);
      next();
    } catch (e) {
      next(typeError);
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
    } catch (e) {
      // next(typeError);
      next(`validateBodyMulter: , ${e}`);
    }
  };
const validateBodyParamsMulter = (
  bodySchema: Joi.ObjectSchema<any>,
  paramsSchema: Joi.ObjectSchema<any>,
  multerSchema: Joi.ObjectSchema<any>
) =>
  async function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const body = req.body;
      const params = req.params;
      const file = req.file;
      await bodySchema.validateAsync(body);
      await paramsSchema.validateAsync(params);
      await multerSchema.validateAsync(file);
      next();
    } catch (e) {
      // next(typeError);
      next(`validateBodyParamsMulter: , ${e}`);
    }
  };

export {
  validateBody,
  validateParams,
  validateBodyParams,
  validateBodyMulter,
  validateBodyParamsMulter,
};
