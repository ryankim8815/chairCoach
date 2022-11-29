import * as express from "express";
import axios from "axios";
import socialLoginService from "../services/socialLoginService";
import { validateCode } from "../middlewares/socialLoginValidationMiddleware";
import qs from "qs";
import urlencode from "urlencode";
import jwt from "jsonwebtoken";

const socialLoginRouter = express.Router();

// axios에서 error 발생시 troubleshooting 용이성을 위해
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    throw new Error("(!) axios error");
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
////////////////////////////////////////
/////////////  카  카  오  ///////////////
////////////////////////////////////////
// POST: kakao api 회원가입 & 로그인
const kakaoOauth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const code = req.body.code;
  const REST_API_KEY = process.env.KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.KAKAO_REDIRECT_URL;
  try {
    const resultToken = await axios({
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
    });
    const resultTokenString = JSON.stringify(resultToken);
    const resultTokenObject = JSON.parse(resultTokenString);
    ///////정보 받아오기///////
    const access_token = resultTokenObject.access_token;
    const resultAccount = await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
    });
    const resultAccountString = JSON.stringify(resultAccount);
    const resultAccountObject = JSON.parse(resultAccountString);
    // 로그인 & 회원가입
    const email = resultAccountObject.email;
    const logedinUser = await socialLoginService.kakao({ email, access_token });
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "kakaoOauth api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /kakao:
 *   post:
 *     summary: kakao 간편 로그인
 *     description: kakao api 간편 로그인 첫 이용 시, 회원가입 절차도 진행됩니다.
 *     tags: ["socialLoginRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: wsh2rwe87iu2gwef9u3rwdft23wes87y13qref97yi
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user@dogfoot.info
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 profile_image:
 *                   type: string
 *                   example: file-1234405177970-416354969.png
 *                 admin:
 *                   type: int
 *                   example: 0
 *                 provider:
 *                   type: string
 *                   example: kakao
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */

////////////////////////////////////////
/////////////  네  이  버  ///////////////
////////////////////////////////////////
const naverOauth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
    const resultToken = await axios({
      method: "GET",
      url: url,
    });
    const resultTokenString = JSON.stringify(resultToken);
    const resultTokenObject = JSON.parse(resultTokenString);
    ///////정보 받아오기///////
    const access_token = resultTokenObject.access_token;
    const resultAccount = await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://openapi.naver.com/v1/nid/me",
    });
    const resultAccountString = JSON.stringify(resultAccount);
    const resultAccountObject = JSON.parse(resultAccountString);
    // 로그인 & 회원가입
    const naverUserResult = resultAccountObject.response;
    const email = naverUserResult.email;
    const logedinUser = await socialLoginService.naver({ email, access_token });
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "naverOauth api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /naver:
 *   post:
 *     summary: naver 간편 로그인
 *     description: naver api 간편 로그인 첫 이용 시, 회원가입 절차도 진행됩니다.
 *     tags: ["socialLoginRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: wsh2rwe87iu2gwef9u3rwdft23wes87y13qref97yi
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user@dogfoot.info
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 profile_image:
 *                   type: string
 *                   example: file-1234405177970-416354969.png
 *                 admin:
 *                   type: int
 *                   example: 0
 *                 provider:
 *                   type: string
 *                   example: naver
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */

////////////////////////////////////////
/////////////   구   글   ///////////////
////////////////////////////////////////
const googleOauth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
    const resultToken = await axios({
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(data),
      url: "https://oauth2.googleapis.com/token",
    });
    const resultTokenString = JSON.stringify(resultToken);
    const resultTokenObject = JSON.parse(resultTokenString);
    ///////정보 받아오기///////
    const jwtDecoded = jwt.decode(resultTokenObject.id_token);
    const jwtDecodedString = JSON.stringify(jwtDecoded);
    const jwtDecodedObject = JSON.parse(jwtDecodedString);
    const email = jwtDecodedObject.email;
    const refresh_token = resultTokenObject.refresh_token;
    // 로그인 & 회원가입
    const logedinUser = await socialLoginService.google({
      email,
      refresh_token,
    });
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "googleOauth api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /google:
 *   post:
 *     summary: google 간편 로그인
 *     description: google api 간편 로그인 첫 이용 시, 회원가입 절차도 진행됩니다.
 *     tags: ["socialLoginRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: wsh2rwe87iu2gwef9u3rwdft23wes87y13qref97yi
 *     responses:
 *       200:
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: boolean
 *                   example: true
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: ${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user@dogfoot.info
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 profile_image:
 *                   type: string
 *                   example: file-1234405177970-416354969.png
 *                 admin:
 *                   type: int
 *                   example: 0
 *                 provider:
 *                   type: string
 *                   example: google
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */

socialLoginRouter.post("/kakao", validateCode, kakaoOauth);
socialLoginRouter.post("/naver", validateCode, naverOauth);
socialLoginRouter.post("/google", validateCode, googleOauth);

export = socialLoginRouter;
