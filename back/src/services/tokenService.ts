import Token from "../models/Token.model";
import * as ClientError from "../responses/clientErrorResponse";
import * as ServerError from "../responses/serverErrorResponse";
import jwt from "jsonwebtoken";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class tokenService {
  //// 전체 운동 기록 조회 기능
  static async reissueToken({ currentRefreshToken, user_id, ipAddress }) {
    const checkToken = await Token.findByRefreshToken({
      currentRefreshToken,
    });

    if (checkToken.length == 0) {
      //   console.log("이거 나오면 FALSE");
      throw ClientError.unauthorized("유효한 토큰이 아닙니다.");
    }
    const isSameIpAdress = checkToken[0].ipAddress == ipAddress;
    console.log(isSameIpAdress);
    if (!isSameIpAdress)
      throw ClientError.unauthorized(
        "[토큰탈취의심] 토큰을 발급받은 위치가 아닌 곳에서 토큰을 활용한 요청이 들어왔습니다."
      );
    // console.log("이거 나오면 true");
    const secretKey = process.env.JWT_SECRET_KEY;
    const accessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // sec, 1day
        user_id: user_id,
      },
      secretKey
    );
    const refreshToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // sec, 1week
        user_id: user_id,
      },
      secretKey
    );
    const status = "valid";
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const tokenUpdate = await Token.reissue({
      currentRefreshToken,
      refreshToken,
      accessToken,
      ipAddress,
      status,
      created_at,
    });
    if (tokenUpdate[1]) {
      const result = Object.assign({
        result: true,
        message: `토큰 재발급이 성공적으로 이뤄졌습니다.`,
        user_id: user_id,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
      return result;
    }
  }
}

export = tokenService;
