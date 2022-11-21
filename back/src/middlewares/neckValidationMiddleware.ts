// import { neckResultsSchema } from "../utils/neckSchemas.joi";
import {
  neckResultsSchema,
  neckResultSchema,
  fileSchema,
} from "../utils/neckSchemas.joi";
import * as express from "express";

const validateNeckResults = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const body = req.body;
    // const body = req;
    // console.log("REQQQQ: ", req);
    await neckResultsSchema.validateAsync(body);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다." + err,
    };
    console.log(result_err);
    // res.status(200).json(result_err);
    res.status(499).json(result_err);
  }
};

const validateNeckResult = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    // console.log("REQ: ", req);
    const body = req.body;
    const file = req.file;
    await neckResultSchema.validateAsync(body);
    await fileSchema.validateAsync(file);
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "type",
      message: "api 요청시 잘못된 type이 첨부되었습니다.",
    };
    console.log(result_err, err);
    // res.status(200).json(result_err);
    res.status(499).json(result_err);
  }
};

// const validateUserCreate = async function (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const body = req.body;
//     // console.log("req: ", req);
//     // console.log("typeof req: ", typeof req);
//     // console.log("req.body.user_id: ", req.body.user_id);
//     // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
//     await userCreateSchema.validateAsync(body);
//     next();
//   } catch (err) {
//     const result_err = {
//       result: false,
//       cause: "type",
//       message: "api 요청시 잘못된 type이 첨부되었습니다.",
//     };
//     console.log(result_err);
//     // res.status(200).json(result_err);
//     res.status(499).json(result_err);
//   }
// };

// const validateUserLogin = async function (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const body = req.body;
//     await userLoginSchema.validateAsync(body);
//     next();
//   } catch (err) {
//     const result_err = {
//       result: false,
//       cause: "type",
//       message: "api 요청시 잘못된 type이 첨부되었습니다.",
//     };
//     console.log(result_err);
//     // res.status(200).json(result_err);
//     res.status(499).json(result_err);
//   }
// };

// const validateUserUpdate = async function (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const body = req.body;
//     // console.log("req: ", req);
//     // console.log("typeof req: ", typeof req);
//     // console.log("req.body.user_id: ", req.body.user_id);
//     // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
//     await userUpdateSchema.validateAsync(body);
//     next();
//   } catch (err) {
//     const result_err = {
//       result: false,
//       cause: "type",
//       message: "api 요청시 잘못된 type이 첨부되었습니다.",
//     };
//     console.log(result_err);
//     // res.status(200).json(result_err);
//     res.status(499).json(result_err);
//   }
// };

// const validateUserDelete = async function (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   try {
//     const body = req.body;
//     // console.log("req: ", req);
//     // console.log("typeof req: ", typeof req);
//     // console.log("req.body.user_id: ", req.body.user_id);
//     // console.log("typeof req.body.user_id: ", typeof req.body.user_id);
//     await userDeleteSchema.validateAsync(body);
//     next();
//   } catch (err) {
//     const result_err = {
//       result: false,
//       cause: "type",
//       message: "api 요청시 잘못된 type이 첨부되었습니다.",
//     };
//     console.log(result_err);
//     // res.status(200).json(result_err);
//     res.status(499).json(result_err);
//   }
// };

// export = validationMiddleware;
export { validateNeckResults, validateNeckResult };
