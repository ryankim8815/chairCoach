import * as express from "express";
import neckService from "../services/neckService";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/uploadMiddleware";
import type { MulterFile } from "../customType/multer.d";
const neckRouter = express.Router();

// GET: 전체 거북목 테스트 결과 조회 기능
const neckResultList = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allNecks = await neckService.getAllNecks();
    console.log(allNecks);
    res.status(200).json(allNecks);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "neckResultList api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
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
 *                 cause:
 *                   type: string
 *                   example: success
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
// GET: 특정 유저의 거북목 테스트 결과 조회
const neckResults = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user_id = req.params.user_id;
    const Necks = await neckService.getNecks({ user_id });
    console.log(Necks);
    res.status(200).json(Necks);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "neckResults api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /user/{user_id}/neck:
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
 *                 cause:
 *                   type: string
 *                   example: success
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

// POST: 거북목 테스트 결과 기록
const neckCreate = async (
  req: express.Request & { files: MulterFile[] },
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user_id = req.user_id;
    const filename = req.file.filename;
    const result = req.body.result;
    const score = req.body.score;
    const allUsers = await neckService.addNeck({
      user_id,
      result,
      score,
      filename,
    });
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (err) {
    const result_err = {
      result: false,
      cause: "api",
      message: "neckCreate api에서 오류가 발생했습니다.",
    };
    console.log(result_err);
    res.status(200).json(result_err);
  }
};
/**
 * @swagger
 * /neck:
 *   post:
 *     summary: 거북목 테스트 결과 기록
 *     description: AI 모델이 완성되면 수정이 필요합니다.
 *     tags: ["neckRouter"]
 *     security:
 *       - bearerAuth: []
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
 *                 cause:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: 거북목 결과 기록이 성공적으로 이뤄졌습니다.
 */

neckRouter.get("/necks", neckResultList); // 전체 거북목 테스트 결과 조회 기능
neckRouter.get("/user/:user_id/neck", neckResults); // 특정 유저의 거북목 테스트 결과 조회
neckRouter.post("/neck", authMiddleware, upload.single("file"), neckCreate); // 거북목 테스트 결과 기록

export = neckRouter;