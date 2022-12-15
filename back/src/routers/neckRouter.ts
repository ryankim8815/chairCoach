import * as express from "express";
import neckController from "../controllers/neckController";
import { authMiddleware } from "../middlewares/authMiddleware";
import uploadMiddleware from "../middlewares/uploadMiddleware";
import * as Validation from "../middlewares/validationMiddleware";
import * as Schemas from "../utils/schemas.joi";

const neckRouter = express.Router();
neckRouter.get("/necks", neckController.neckResultList); // 전체 거북목 테스트 결과 조회 기능, 개발 시 편의용으로 사용처가 없다면 삭제 예정
neckRouter.get(
  "/necks/:user_id",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.userCurrentSchema
  ),
  neckController.neckResults
); // 특정 유저의 거북목 테스트 결과 조회
neckRouter.post(
  "/necks/:user_id",
  uploadMiddleware,
  authMiddleware,
  Validation.validateBodyParamsMulter(
    Schemas.neckResultSchema,
    Schemas.userCurrentSchema,
    Schemas.fileSchema
  ),
  neckController.neckCreate
); // 거북목 테스트 결과 기록

neckRouter.get(
  "/necks/:user_id/:year",
  authMiddleware,
  Validation.validateBodyParams(
    Schemas.userCurrentSchema,
    Schemas.neckRecordsFindByYear
  ),
  neckController.neckRecordsYear
); // 특정 유저의 거북목 기록 조회 - 월간

export = neckRouter;

/**
 * @swagger
 * /necks:
 *   get:
 *     summary: 전체 거북목 테스트 결과 조회
 *     description: 전체 거북목 테스트 결과 조회
 *     tags: ["neckRouter"]
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
 *                   example: 모든 거북목 결과 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 10000
 *                 list:
 *                   type: object
 *                   properties:
 *                     neck_id:
 *                       type: string
 *                     filename:
 *                       type: strin
 *                     result:
 *                       type: stringg
 *                     score:
 *                       type: int
 *                     created_at:
 *                       type: timstamp
 *                   example:
 *                     - neck_id: fawa524tweryht3w
 *                       filename: etg634eftg3re.jpg
 *                       result: 1.23
 *                       score: 70
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                     - neck_id: sdyg5346yw34er35
 *                       filename: ert35ertg3w5tger.jpg
 *                       result: 2.03
 *                       score: 50
 *                       created_at: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /necks/{user_id}:
 *   get:
 *     summary: 특정 유저의 거북목 테스트 결과 조회
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["neckRouter"]
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
 *                   example: 해당 유저의 거북목 결과 조회가 성공적으로 이뤄졌습니다.
 *                 count:
 *                   type: int
 *                   example: 100
 *                 list:
 *                   type: object
 *                   properties:
 *                     neck_id:
 *                       type: string
 *                     filename:
 *                       type: strin
 *                     result:
 *                       type: stringg
 *                     score:
 *                       type: int
 *                     created_at:
 *                       type: timstamp
 *                   example:
 *                     - neck_id: fawa524tweryht3w
 *                       filename: etg634eftg3re.jpg
 *                       result: 1.23
 *                       score: 70
 *                       created_at: 2022-11-03T04:52:32.000Z
 *                     - neck_id: sdyg5346yw34er35
 *                       filename: ert35ertg3w5tger.jpg
 *                       result: 2.03
 *                       score: 50
 *                       created_at: 2022-11-01T01:01:01.000Z
 */

/**
 * @swagger
 * /necks/{user_id}:
 *   post:
 *     summary: 거북목 테스트 결과 기록
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["neckRouter"]
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
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                type: string
 *                format: binary
 *               result:
 *                type: float
 *               score:
 *                type: int
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
 *                   example: 거북목 결과 기록이 성공적으로 이뤄졌습니다.
 */

/**
 * @swagger
 * /necks/{user_id}/{year}:
 *   get:
 *     summary: 특정 유저의 거북목 기록 조회 - 특정연도의 월간 기록
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["neckRouter"]
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
 *                 message:
 *                   type: string
 *                   example: 해당 유저의 거북목 기록 조회가 성공적으로 이뤄졌습니다.
 *                 list:
 *                   type: object
 *                   properties:
 *                     month:
 *                       type: string
 *                     count:
 *                       type: int
 *                     avg:
 *                       type: float
 *                   example:
 *                     - month: 2022-11
 *                       count: 5
 *                       avg: 55.5555
 */
