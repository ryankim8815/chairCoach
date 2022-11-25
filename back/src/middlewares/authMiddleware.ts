import jwt from "jsonwebtoken";
import * as express from "express";

const authMiddleware = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (userToken === "null") {
    const result_errNoToken = {
      result: false,
      cause: "token",
      message: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    };
    console.log(result_errNoToken);
    return res.status(400).json(result_errNoToken);
    return;
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
    const jwtDecoded: any = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.body.user_id = user_id;
    next();
  } catch (error) {
    const result_errInvalidToken = {
      result: false,
      cause: "token",
      message: "정상적인 토큰이 아닙니다. 다시 한 번 확인해 주세요.",
    };
    console.log(result_errInvalidToken);
    return res.status(400).json(result_errInvalidToken);
  }
};

export = authMiddleware;
