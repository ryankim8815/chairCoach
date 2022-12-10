"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express = __importStar(require("express"));
var neckController_1 = __importDefault(require("../controllers/neckController"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
var Validation = __importStar(require("../middlewares/validationMiddleware"));
var Schemas = __importStar(require("../utils/schemas.joi"));
var neckRouter = express.Router();
neckRouter.get("/necks", neckController_1.default.neckResultList); // 전체 거북목 테스트 결과 조회 기능, 개발 시 편의용으로 사용처가 없다면 삭제 예정
neckRouter.get("/necks/:user_id", authMiddleware_1.default, Validation.validateBodyParams(Schemas.userCurrentSchema, Schemas.userCurrentSchema), neckController_1.default.neckResults); // 특정 유저의 거북목 테스트 결과 조회
neckRouter.post("/necks/:user_id", uploadMiddleware_1.default, authMiddleware_1.default, Validation.validateBodyParamsMulter(Schemas.neckResultSchema, Schemas.userCurrentSchema, Schemas.fileSchema), neckController_1.default.neckCreate); // 거북목 테스트 결과 기록
neckRouter.get("/necks/:user_id/:year", authMiddleware_1.default, Validation.validateBodyParams(Schemas.userCurrentSchema, Schemas.neckRecordsFindByYear), neckController_1.default.neckRecordsYear); // 특정 유저의 거북목 기록 조회 - 월간
module.exports = neckRouter;
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
