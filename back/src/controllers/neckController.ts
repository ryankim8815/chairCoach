import * as express from "express";
import neckService from "../services/neckService";
import type { MulterFile } from "../customType/multer.d";

class userController {
  // GET: 전체 거북목 테스트 결과 조회 기능
  static async neckResultList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const allNecks = await neckService.getAllNecks();
      return res.status(200).json(allNecks);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "neckResultList api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // GET: 특정 유저의 거북목 테스트 결과 조회
  static async neckResults(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const Necks = await neckService.getNecks({ user_id });
      return res.status(200).json(Necks);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "neckResults api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // POST: 거북목 테스트 결과 기록
  static async neckCreate(
    req: express.Request & { files: MulterFile[] },
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const filename = req.file.filename;
      const result = req.body.result;
      const score = req.body.score;
      const allUsers = await neckService.addNeck({
        user_id,
        result,
        score,
        filename,
      });
      return res.status(200).json(allUsers);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "neckCreate api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }
}

export = userController;
