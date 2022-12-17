import * as express from "express";
import tokenService from "../services/tokenService";
const logger = require("../config/logger");

class tokenController {
  // POST: 토큰 재발급
  static async tokenReissue(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const currentRefreshToken = req.body.refreshToken;
      const ipAddress = req.body.requestClientIp;
      const checkToken = await tokenService.reissueToken({
        currentRefreshToken,
        user_id,
        ipAddress,
      });
      logger.info(checkToken);
      return res.status(200).json(checkToken);
    } catch (e) {
      next(e);
    }
  }
}

export = tokenController;
