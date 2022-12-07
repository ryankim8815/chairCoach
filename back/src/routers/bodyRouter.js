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
var bodyController_1 = __importDefault(require("../controllers/bodyController"));
var authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
var Validation = __importStar(require("../middlewares/validationMiddleware"));
var Schemas = __importStar(require("../utils/schemas.joi"));
var bodyRouter = express.Router();
bodyRouter.get("/bodies", bodyController_1.default.bodyRecordlist); // 전체 운동 기록 조회 기능, 개발시 편의를 위한 기능으로 사용처가 없다면 삭제 예정
bodyRouter.get("/bodies/:user_id", authMiddleware_1.default, Validation.validateBodyParams(Schemas.userCurrentSchema, Schemas.userCurrentSchema), bodyController_1.default.bodyRecords); // 특정 유저의 운동 기록 조회
bodyRouter.post("/bodies/:user_id/recording", authMiddleware_1.default, Validation.validateBodyParams(Schemas.bodyCreateSchema, Schemas.userCurrentSchema), bodyController_1.default.bodyCreate); // 특정 유저의 운동 기록 시작
bodyRouter.patch("/bodies/:user_id/terminating", authMiddleware_1.default, Validation.validateBodyParams(Schemas.bodyUpdateSchema, Schemas.userCurrentSchema), bodyController_1.default.bodyUpdate); // 특정 유저의 운동 기록 종료
bodyRouter.get("/bodies/:user_id/:year/:week", authMiddleware_1.default, Validation.validateBodyParams(Schemas.userCurrentSchema, Schemas.bodyRecordsFindByWeek), bodyController_1.default.bodyRecordsWeek); // 특정 유저의 운동 기록 조회 - 일간
bodyRouter.get("/bodies/:user_id/:year", authMiddleware_1.default, Validation.validateBodyParams(Schemas.userCurrentSchema, Schemas.bodyRecordsFindByYear), bodyController_1.default.bodyRecordsYear); // 특정 유저의 운동 기록 조회 - 월간
module.exports = bodyRouter;
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
 *                 message:
 *                   type: string
 *                   example: 해당 유저의 운동 기록 종료가 성공적으로 이뤄졌습니다.
 */
