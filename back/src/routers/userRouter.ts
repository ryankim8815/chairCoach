import * as express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import nodemailerMiddleware from "../middlewares/nodemailerMiddleware";
import * as Validation from "../middlewares/validationMiddleware";
import * as Schemas from "../utils/schemas.joi";
import userController from "../controllers/userController";

const userRouter = express.Router();

// api index
userRouter.get("/users", userController.userList); // 전체 사용자 검색, 개발시 편의용으로 사용하는 곳이 없다면 추후 삭제 예정
userRouter.get(
  "/users/:user_id",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.userCurrentSchema
  ),
  userController.userCurrent
); // 현재 사용자 정보 조회
userRouter.post(
  "/signup",
  Validation.validateBody(Schemas.userCreateSchema),
  userController.userRegister
); // 자체 회원가입
userRouter.post(
  "/signin",
  Validation.validateBody(Schemas.userLoginSchema),
  userController.userSignin
); // 로그인
userRouter.post(
  "/users/:user_id/password",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.checkPasswordSchema,
    Schemas.userCurrentSchema
  ),
  userController.userPassword
); // 유저 정보 업데이트를 위한 password 확인
userRouter.put(
  "/users/:user_id",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userUpdateSchema,
    Schemas.userCurrentSchema
  ),
  userController.userUpdate
); // 유저 정보 업데이트(pw & nickname)
userRouter.put(
  "/users/:user_id/provider/:provider",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.socialLoginUserUpdateSchema,
    Schemas.socialLoginUserUpdateSchemaParams
  ),
  userController.socialLoginUserUpdate
); // 유저 정보 업데이트(nickname) - 간편로그인 회원용
userRouter.delete(
  "/users/:user_id",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userDeleteSchema,
    Schemas.userCurrentSchema
  ),
  userController.userDelete
); // 유저 삭제
userRouter.post(
  "/signup/email",
  Validation.validateBody(Schemas.signupEmailSchema),
  nodemailerMiddleware,
  userController.signupEmail
); // email로 코드 발송
userRouter.get(
  "/signup/email/:email/code/:code",
  Validation.validateParams(Schemas.verifyEmailSchema),
  userController.signupVerifyEmail
); // email 인증
userRouter.get(
  "/signup/nickname/:nickname",
  Validation.validateParams(Schemas.signupNicknameSchema),
  userController.signupNickname
); // nickname 중복확인
userRouter.patch(
  "/users/:user_id/alert",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.setAlertSchema,
    Schemas.userCurrentSchema
  ),
  userController.userSetAlert
); // 알람 설정

export = userRouter;

/**
 * @swagger
 * /users:
 *   get:
 *     summary: 전체 사용자 조회
 *     description: 전체 사용자 조회
 *     tags: ["userRouter"]
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
 *                   example: 모든 사용자 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     nickname:
 *                       type: string
 *                     provider:
 *                       type: string
 *                     created_at:
 *                       type: timstamp
 *                   example:
 *                     - email: user1@gmail.com
 *                       nickname: user1
 *                       provider: kakao
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                     - email: user2@gmail.com
 *                       nickname: user2
 *                       provider: naver
 *                       created_at: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /users/{user_id}:
 *   get:
 *     summary: 현재 사용자 조회
 *     description: 현재 로그인된 사용자 정보를 조회합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
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
 *                   example: 현재 사용자 정보 조회가 성공적으로 이뤄졌습니다.
 *                 email:
 *                   type: string
 *                 nickname:
 *                   type: string
 *                 provider:
 *                   type: string
 *                 created_at:
 *                   type: timstamp
 *                   example:
 *                     email: user1@gmail.com
 *                     nickname: user1
 *                     provider: kakao
 *                     created_at: 2022-11-03T04:52:32.000Z
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: 회원가입
 *     description: email과 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: password1234
 *               nickname:
 *                 type: string
 *                 example: userNickname
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
 *                   example: 회원가입이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: 로그인
 *     description: email과 password가 필요합니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1@gmail.com
 *               password:
 *                 type: string
 *                 example: password1234
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
 *                   example: 로그인이 성공적으로 이뤄졌습니다.
 *                 token:
 *                   type: string
 *                   example: awj32ew86tgcvwstudggaiqa98yiqgdiqyas238ewyufdhjv29qiaedz87iyhvd
 *                 email:
 *                   type: string
 *                   example: user1@gmail.com
 *                 nickname:
 *                   type: string
 *                   example: bowwow
 *                 provider:
 *                   type: string
 *                   example: google
 *                 created_at:
 *                   type: timestamp
 *                   example: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /users/{user_id}/password:
 *   post:
 *     summary: 회원정보 수정을 위한 비밀번호 확인
 *     description: 회원정보 수정을 위한 비밀번호 확인
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: test1234
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
 *                   example: 입력하신 password가 일치합니다.
 */

/**
 * @swagger
 * /users/{user_id}:
 *   put:
 *     summary: 회원정보 수정
 *     description: 회원정보 수정 시에도 nickname은 중복 검사가 필요합니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: new_password
 *               nickname:
 *                 type: string
 *                 example: new_nickname
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
 *                   example: 회원정보 수정이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /users/{user_id}/provider/{provider}:
 *   put:
 *     summary: 회원정보 수정 - 간편로그인 회원용
 *     description: nickname만 수정됩니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: provider
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 example: new_nickname
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
 *                   example: 회원정보 수정이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /users/{user_id}:
 *   delete:
 *     summary: 회원정보 삭제
 *     description: 한번 삭제한 사용자는 복구할 수 없습니다.
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: password1234
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
 *                   example: 회원정보 삭제가 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /signup/email:
 *   post:
 *     summary: email 인증을 위한 코드 발송
 *     description:  코드 발급전에 중복확인을 실시합니다. 재발급 가능하며, 회원 가입시 코드는 폐기됩니다.
 *     tags: ["userRouter"]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: example@gmail.com
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
 *                   example: code (재)발급이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /signup/email/{email}/code/{code}:
 *   get:
 *     summary: email 인증 코드 확인
 *     description: 인증 완료시 code는 삭제됩니다.
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
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
 *                   example: email 인증에 성공했습니다.
 */

/**
 * @swagger
 * /signup/nickname/{nickname}:
 *   get:
 *     summary: nickname 중복확인
 *     description:  nickname 중복확인
 *     tags: ["userRouter"]
 *     parameters:
 *       - in: path
 *         name: nickname
 *         schema:
 *           type: string
 *         required: true
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
 *                   example: 중복된 nickname이 없습니다. 가입을 진행해주세요.
 */

/**
 * @swagger
 * /users/{user_id}/alert:
 *   patch:
 *     summary: 알람 설정
 *     description:  알람 설정
 *     tags: ["userRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               alert:
 *                 type: boolean
 *                 example: true
 *               timer:
 *                 type: int
 *                 example: 15
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
 *                   example: Alert 업데이트가 성공적으로 이뤄졌습니다.
 */
