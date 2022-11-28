import * as express from "express";
import bodyService from "../services/bodyService";
import authMiddleware from "../middlewares/authMiddleware";
import * as validation from "../middlewares/bodyValidationMiddleware";
import type { MulterFile } from "../customType/multer.d";
const bodyRouter = express.Router();

// GET: 전체 운동 기록 조회 기능
const bodyRecordlist = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allBodies = await bodyService.getAllBodies();
    return res.status(200).json(allBodies);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "bodyRecordlist api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
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

// GET: 특정 유저의 운동 기록 조회
const bodyRecords = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user_id = req.body.user_id;
    const Bodies = await bodyService.getBodies({ user_id });
    return res.status(200).json(Bodies);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "bodyRecords api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /body:
 *   get:
 *     summary: 특정 유저의 운동 기록 조회
 *     description: 로그인한 사용자만 이용 가능합니다.
 *     tags: ["bodyRouter"]
 *     security:
 *       - bearerAuth: []
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

// POST: 특정 유저의 운동 기록 시작
const bodyCreate = async (
  req: express.Request & { files: MulterFile[] },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user_id = req.body.user_id;
    const tag = req.body.tag;
    const body = await bodyService.addBody({
      user_id,
      tag,
    });
    return res.status(200).json(body);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "bodyCreate api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /body:
 *   post:
 *     summary: 특정 유저의 운동 기록 시작
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["bodyRouter"]
 *     security:
 *       - bearerAuth: []
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

// PATCH: 특정 유저의 운동 기록 종료
const bodyUpdate = async (
  // req: express.Request & { files: MulterFile[] },
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user_id = req.body.user_id; // 확인하는 것으로 수정 예정
    const body_id = req.body.body_id;
    const body = await bodyService.updateBody({
      body_id,
    });
    return res.status(200).json(body);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "bodyUpdate api에서 오류가 발생했습니다.",
    };
    return res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /body:
 *   patch:
 *     summary: 특정 유저의 운동 기록 종료
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["bodyRouter"]
 *     security:
 *       - bearerAuth: []
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

bodyRouter.get("/bodies", bodyRecordlist); // 전체 운동 기록 조회 기능, 개발시 편의를 위한 기능으로 사용처가 없다면 삭제 예정
bodyRouter.get(
  "/body",
  authMiddleware,
  validation.validateBodyRecords,
  bodyRecords
); // 특정 유저의 운동 기록 조회
bodyRouter.post(
  "/body",
  authMiddleware,
  validation.validateBodyCreate,
  bodyCreate
); // 특정 유저의 운동 기록 시작
bodyRouter.patch(
  "/body",
  authMiddleware,
  validation.validateBodyUpdate,
  bodyUpdate
); // 특정 유저의 운동 기록 종료

export = bodyRouter;
