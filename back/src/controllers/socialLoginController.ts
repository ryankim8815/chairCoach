import * as express from "express";
import axios from "axios";
import socialLoginService from "../services/socialLoginService";
import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import qs from "qs";
import urlencode from "urlencode";
import jwt from "jsonwebtoken";

// axios에서 error 발생시 troubleshooting 용이성을 위해
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    // console.log(err);
    // throw new Error("(!) axios error");
    throw new Error(`(!) axios error: ${err}`);
  }
);
// formdata 포멧으로 만들어 줌
const makeFormData = (params: any) => {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    searchParams.append(key, params[key]);
  });
  return searchParams;
};

class socialLoginController {
  ////////////////////////////////////////
  /////////////  카  카  오  ///////////////
  ////////////////////////////////////////
  // POST: kakao api 회원가입 & 로그인
  static async kakaoOauth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const code = req.body.code;
    const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
    try {
      const resultToken = nullPrototypeHandler(
        await axios({
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
          url: "https://kauth.kakao.com/oauth/token",
          data: makeFormData({
            grant_type: "authorization_code",
            client_id: REST_API_KEY,
            redirect_uri: REDIRECT_URI,
            code: code,
          }),
        })
      );
      ///////정보 받아오기///////
      const access_token = resultToken.access_token;
      const resultAccount = nullPrototypeHandler(
        await axios({
          method: "GET",
          headers: {
            Authorization: `bearer ${access_token}`,
          },
          url: "https://kapi.kakao.com/v1/oidc/userinfo",
        })
      );
      // 로그인 & 회원가입
      const email = resultAccount.email;
      const logedinUser = await socialLoginService.kakao({
        email,
        access_token,
      });
      return res.status(200).json(logedinUser);
    } catch (e) {
      next(e);
    }
  }

  ////////////////////////////////////////
  /////////////  네  이  버  ///////////////
  ////////////////////////////////////////
  static async naverOauth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const code = req.body.code;
    const state = process.env.NAVER_STATE;
    const client_id = process.env.NAVER_CLIENT_ID;
    const client_secret = process.env.NAVER_CLIENT_SECRET;
    const redirectURI = process.env.NAVER_REDIRECT_URL;
    const encoded = encodeURIComponent(redirectURI);
    const url = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${encoded}&code=${code}&state=${state}`;
    // const FE_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encoded}&state=${state}`;
    // console.log("FE_url: ", FE_url);
    try {
      const resultToken = nullPrototypeHandler(
        await axios({
          method: "GET",
          url: url,
        })
      );
      ///////정보 받아오기///////
      const access_token = resultToken.access_token;
      const resultAccount = nullPrototypeHandler(
        await axios({
          method: "GET",
          headers: {
            Authorization: `bearer ${access_token}`,
          },
          url: "https://openapi.naver.com/v1/nid/me",
        })
      );
      // 로그인 & 회원가입
      const naverUserResult = resultAccount.response;
      const email = naverUserResult.email;
      const logedinUser = nullPrototypeHandler(
        await socialLoginService.naver({
          email,
          access_token,
        })
      );
      return res.status(200).json(logedinUser);
    } catch (e) {
      next(e);
    }
  }

  ////////////////////////////////////////
  /////////////   구   글   ///////////////
  ////////////////////////////////////////
  static async googleOauth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const code = urlencode.decode(req.body.code);
    const login_hint = req.body.email || null; // 로그인을 시도하는 email
    const nonce = req.body.nonce; //  앱이 생성한 임의의 값
    const state = process.env.GOOGLE_STATE;
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const client_secret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectURI = process.env.GOOGLE_REDIRECT_URL;
    const hd = process.env.GOOGLE_HD;
    const encoded = encodeURIComponent(redirectURI);
    // const FE_url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${encoded}&state=${state}&login_hint=${login_hint}&nonce=${nonce}&hd=${hd}`;
    // console.log("url: ", FE_url);
    // const url = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${client_id}&scope=openid%20email&redirect_uri=${encoded}&state=${state}&login_hint=${login_hint}&nonce=${nonce}&hd=${hd}`;

    try {
      const data = {
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirectURI,
        grant_type: "authorization_code",
      };
      const resultToken = nullPrototypeHandler(
        await axios({
          method: "POST",
          headers: { "content-type": "application/x-www-form-urlencoded" },
          data: qs.stringify(data),
          url: "https://oauth2.googleapis.com/token",
        })
      );
      ///////정보 받아오기///////
      const jwtDecoded = nullPrototypeHandler(jwt.decode(resultToken.id_token));
      const email = jwtDecoded.email;
      const refresh_token = resultToken.refresh_token;
      // 로그인 & 회원가입
      const logedinUser = await socialLoginService.google({
        email,
        refresh_token,
      });
      return res.status(200).json(logedinUser);
    } catch (e) {
      next(e);
    }
  }
}

export = socialLoginController;
