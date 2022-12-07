import * as express from "express";
import bodyController from "../controllers/bodyController";
import authMiddleware from "../middlewares/authMiddleware";
import * as Validation from "../middlewares/validationMiddleware";
import * as Schemas from "../utils/schemas.joi";

const bodyRouter = express.Router();
bodyRouter.get("/bodies", bodyController.bodyRecordlist); // 전체 운동 기록 조회 기능, 개발시 편의를 위한 기능으로 사용처가 없다면 삭제 예정
bodyRouter.get(
  "/bodies/:user_id",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.userCurrentSchema
  ),
  bodyController.bodyRecords
); // 특정 유저의 운동 기록 조회
bodyRouter.post(
  "/bodies/:user_id/recording",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.bodyCreateSchema,
    Schemas.userCurrentSchema
  ),
  bodyController.bodyCreate
); // 특정 유저의 운동 기록 시작
bodyRouter.patch(
  "/bodies/:user_id/terminating",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.bodyUpdateSchema,
    Schemas.userCurrentSchema
  ),
  bodyController.bodyUpdate
); // 특정 유저의 운동 기록 종료

bodyRouter.get(
  "/bodies/:user_id/:year/:week",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.bodyRecordsFindByWeek
  ),
  bodyController.bodyRecordsWeek
); // 특정 유저의 운동 기록 조회 - 일간

bodyRouter.get(
  "/bodies/:user_id/:year",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.bodyRecordsFindByYear
  ),
  bodyController.bodyRecordsYear
); // 특정 유저의 운동 기록 조회 - 월간

export = bodyRouter;

/**
 * @swagger
 * /bodies:
 *   get:
 *     summary: 전체 운동 기록 조회 기능
 *     description: 전체 운동 기록 조회 기능
 *     tags: ["bodyRouter"]
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
 *                   example: 전체 운동 기록 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     body_id:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     start_time:
 *                       type: timstamp
 *                     end_time:
 *                       type: timstamp
 *                   example:
 *                     - body_id: fawa524tweryht3w
 *                       tag: neck
 *                       start_time: 2022-11-03T04:52:32.000Z
 *                       end_time: 2022-11-03T04:52:32.000Z
 *                     - body_id: fawa524tweryht3w
 *                       tag: neck
 *                       start_time: 2022-11-03T04:52:32.000Z
 *                       end_time: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /bodies/{user_id}:
 *   get:
 *     summary: 특정 유저의 운동 기록 조회
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["bodyRouter"]
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
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 100
 *                 list:
 *                   type: object
 *                   properties:
 *                     body_id:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     start_time:
 *                       type: intimstampt
 *                     end_time:
 *                       type: timstamp
 *                   example:
 *                     - body_id: fawa524tweryht3w
 *                       tag: neck
 *                       start_time: 2022-11-03T04:52:32.000Z
 *                       end_time: 2022-11-03T04:52:32.000Z
 *                     - body_id: fawa524tweryht3w
 *                       tag: neck
 *                       start_time: 2022-11-03T04:52:32.000Z
 *                       end_time: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /bodies/{user_id}/{year}/{week}:
 *   get:
 *     summary: 특정 유저의 운동 기록 조회 - 특정연도의 주단위 일간 기록
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["bodyRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: year
 *         schema:
 *           type: number
 *         required: true
 *       - in: path
 *         name: week
 *         schema:
 *           type: number
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
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.
 *                 list:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     count:
 *                       type: int
 *                     duration:
 *                       type: int
 *                   example:
 *                     - date: 2022-12-02
 *                       tag: neck
 *                       count: 5
 *                       duration: 10
 */

/**
 * @swagger
 * /bodies/{user_id}/{year}:
 *   get:
 *     summary: 특정 유저의 운동 기록 조회 - 특정연도의 월간 기록
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["bodyRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: year
 *         schema:
 *           type: number
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
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.
 *                 list:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: string
 *                     tag:
 *                       type: string
 *                     count:
 *                       type: int
 *                     duration:
 *                       type: int
 *                   example:
 *                     - month: 2022-11
 *                       tag: neck
 *                       count: 5
 *                       duration: 10
 */

/**
 * @swagger
 * /bodies/{user_id}/recording:
 *   post:
 *     summary: 특정 유저의 운동 기록 시작
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["bodyRouter"]
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
 *               tag:
 *                 type: string
 *                 example: neck
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
 *                   example: 해당 유저의 운동 기록 시작이 성공적으로 이뤄졌습니다.
 *                 body_id:
 *                   type: string
 *                   example: fawa524tweryht3w
 */

/**
 * @swagger
 * /bodies/{user_id}/terminating:
 *   patch:
 *     summary: 특정 유저의 운동 기록 종료
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["bodyRouter"]
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
 *               body_id:
 *                 type: string
 *                 example: fawa524tweryht3w
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
 *                   example: 해당 유저의 운동 기록 종료가 성공적으로 이뤄졌습니다.
 */
