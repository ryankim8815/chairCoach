import * as express from "express";
import tokenController from "../controllers/tokenController";
import { refreshToken } from "../middlewares/authMiddleware";
import * as Validation from "../middlewares/validationMiddleware";
import * as Schemas from "../utils/schemas.joi";

const tokenRouter = express.Router();
tokenRouter.post("/token", refreshToken, tokenController.tokenReissue); // 토큰 재발급

export = tokenRouter;

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
