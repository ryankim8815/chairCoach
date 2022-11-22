import * as express from "express";
import axios from "axios";
import socialLoginService from "../services/socialLoginService";

const socialLoginRouter = express.Router();

// axios에서 error 발생시 troubleshooting 용이성을 위해
axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
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
    let kakaoToken: any = "";
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
      .then((res) => {
        kakaoToken = res;
      })
      .catch((err) => {
        console.log(err);
      });
    ///////정보 받아오기///////
    let kakaoUser: any = "";
    const access_token = kakaoToken.access_token;
    await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://kapi.kakao.com/v1/oidc/userinfo",
    })
      .then((res) => {
        kakaoUser = res;
      })
      .catch((err) => {
        console.log(err);
      });
    // 로그인 & 회원가입
    const email = kakaoUser.email;
    const logedinUser = await socialLoginService.kakao({ email, access_token });
    console.log(logedinUser);
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "kakaoOauth api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /kakaoOauth:
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
  //   const FE_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${encoded}&state=${state}`;
  //   console.log("FE_url: ", FE_url);
  try {
    let naverToken: any = "";
    await axios({
      method: "GET",
      url: url,
    })
      .then((res) => {
        naverToken = res;
      })
      .catch((err) => {
        console.log(err);
      });
    ///////정보 받아오기///////
    let naverUser: any = "";
    const access_token = naverToken.access_token;
    await axios({
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token}`,
      },
      url: "https://openapi.naver.com/v1/nid/me",
    })
      .then((res) => {
        naverUser = res;
      })
      .catch((err) => {
        console.log(err);
      });
    // 로그인 & 회원가입
    const naverUserRes = naverUser.response;
    const email = naverUserRes.email;
    const logedinUser = await socialLoginService.naver({ email, access_token });
    console.log(logedinUser);
    return res.status(200).json(logedinUser);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "naverOauth api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /naverOauth:
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
 *               state:
 *                 type: string
 *                 example: state
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

socialLoginRouter.post("/kakaoOauth", kakaoOauth);
socialLoginRouter.post("/naverOauth", naverOauth);
// socialLoginRouter.post("/googleOauth", googleOauth);

export = socialLoginRouter;
