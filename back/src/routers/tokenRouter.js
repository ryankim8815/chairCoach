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
var tokenController_1 = __importDefault(require("../controllers/tokenController"));
var authMiddleware_1 = require("../middlewares/authMiddleware");
var tokenRouter = express.Router();
tokenRouter.post("/token", authMiddleware_1.refreshToken, tokenController_1.default.tokenReissue); // 토큰 재발급
module.exports = tokenRouter;
/**
 * @swagger
 * /token:
 *   post:
 *     summary: 토큰 재발급
 *     description: 토큰이 재발급됩니다.
 *     tags: ["tokenRouter"]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *                   example: 토큰 재발급이 성공적으로 이뤄졌습니다.
 *                 refreshToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3Mjg4MjUsInVzZXJfaWQiOiJlMTA3OWM4Yi0xZWYzLTQ0MzYtYTIxNC1mOTdiNDE5ZmJhZDciLCJpYXQiOjE2NzExMjQwMjV9.vy6LeqN4dh-fa1yWFKvO7f4t0_0O2idpn10J8-XnKDw"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzE3Mjg4MjUsInVzZXJfaWQiOiJlMTA3OWM4Yi0xZWYzLTQ0MzYtYTIxNC1mOTdiNDE5ZmJhZDciLCJpYXQiOjE2NzExMjQwMjV9.vy6LeqN4dh-fa1yWFKvO7f4t0_0O2idpn10J8-XnKDw"
 */
