import * as express from "express";
import socialLoginController from "../controllers/socialLoginController";
import { validateCode } from "../middlewares/socialLoginValidationMiddleware";

const socialLoginRouter = express.Router();

socialLoginRouter.post(
  "/kakao",
  validateCode,
  socialLoginController.kakaoOauth
);
socialLoginRouter.post(
  "/naver",
  validateCode,
  socialLoginController.naverOauth
);
socialLoginRouter.post(
  "/google",
  validateCode,
  socialLoginController.googleOauth
);

export = socialLoginRouter;

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
