import jwt from "jsonwebtoken";
import * as express from "express";
import * as ClientError from "../responses/clientErrorResponse";
import Token from "../models/Token.model";

const authMiddleware = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  const userToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (userToken === "null") {
    throw ClientError.unauthorized(
      "로그인한 유저만 사용할 수 있는 서비스입니다."
    );
  }
  try {
    const checkToken = await Token.findByAccessToken({
      userToken,
    });
    // console.log("CHECKKKKKK: ", checkToken);
    if (checkToken.length !== 1)
      throw ClientError.unauthorized("유효한 토큰이 아닙니다.");
    const isSameIpAdress = checkToken[0].ip_address == req.body.requestClientIp;
    // console.log("checkToken[0].ipAddress: ", checkToken[0].ipAddress);
    // console.log("req.body.requestClientIp: ", req.body.requestClientIp);
    // console.log("isSameIpAdress: ", isSameIpAdress);
    if (!isSameIpAdress)
      throw ClientError.unauthorized(
        "[토큰탈취의심] 토큰을 발급받은 위치가 아닌 곳에서 토큰을 활용한 요청이 들어왔습니다."
      );
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded: any = jwt.verify(userToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.body.user_id = user_id;
    next();
  } catch (e) {
    next(e);
  }
};
const refreshToken = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // const accessToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  const refreshToken = req.headers["authorization"]?.split(" ")[1] ?? "null";
  if (refreshToken === "null") {
    throw ClientError.unauthorized("유효한 토큰이 아닙니다.");
  }
  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const jwtDecoded: any = jwt.verify(refreshToken, secretKey);
    const user_id = jwtDecoded.user_id;
    req.body.user_id = user_id;
    req.body.refreshToken = refreshToken;
    next();
  } catch (e) {
    next(e);
  }
};

export { authMiddleware, refreshToken };
