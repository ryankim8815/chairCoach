import * as express from "express";
import neckService from "../services/neckService";
import * as ClientError from "../responses/clientErrorResponse";
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
    } catch (e) {
      next(e);
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
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const Necks = await neckService.getNecks({ user_id });
      return res.status(200).json(Necks);
    } catch (e) {}
  }

  // POST: 거북목 테스트 결과 기록
  static async neckCreate(
    req: express.Request & { files: MulterFile[] },
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
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
    } catch (e) {
      next(e);
    }
  }

  // GET: 특정 유저의 거북목 기록 조회 year
  static async neckRecordsYear(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const year = req.params.year;
      const necks = await neckService.getNecksByYear({ user_id, year });
      return res.status(200).json(necks);
    } catch (e) {
      next(e);
    }
  }
}

export = userController;
