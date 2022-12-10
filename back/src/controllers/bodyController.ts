import * as express from "express";
import bodyService from "../services/bodyService";
import * as ClientError from "../responses/clientErrorResponse";
import type { MulterFile } from "../customType/multer.d";
const logger = require("../config/logger");

class bodyController {
  // GET: 전체 운동 기록 조회 기능
  static async bodyRecordlist(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const getAllBodies = await bodyService.getAllBodies();

      logger.info(getAllBodies);
      return res.status(200).json(getAllBodies);
    } catch (e) {
      next(e);
    }
  }

  // GET: 특정 유저의 운동 기록 조회
  static async bodyRecords(
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
      const getBodies = await bodyService.getBodies({ user_id });

      logger.info(getBodies);
      return res.status(200).json(getBodies);
    } catch (e) {
      next(e);
    }
  }

  // POST: 특정 유저의 운동 기록 시작
  static async bodyCreate(
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
      const tag = req.body.tag;
      const addBody = await bodyService.addBody({
        user_id,
        tag,
      });

      logger.info(addBody);
      return res.status(200).json(addBody);
    } catch (e) {
      next(e);
    }
  }

  // PATCH: 특정 유저의 운동 기록 종료
  static async bodyUpdate(
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
      const body_id = req.body.body_id;
      const updateBody = await bodyService.updateBody({
        body_id,
      });

      logger.info(updateBody);
      return res.status(200).json(updateBody);
    } catch (e) {
      next(e);
    }
  }

  // GET: 특정 유저의 운동 기록 조회 week
  static async bodyRecordsWeek(
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
      const week = req.params.week;
      const getBodiesByWeek = await bodyService.getBodiesByWeek({
        user_id,
        year,
        week,
      });

      logger.info(getBodiesByWeek);
      return res.status(200).json(getBodiesByWeek);
    } catch (e) {
      next(e);
    }
  }

  // GET: 특정 유저의 운동 기록 조회 year
  static async bodyRecordsYear(
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
      const getBodiesByYear = await bodyService.getBodiesByYear({
        user_id,
        year,
      });

      logger.info(getBodiesByYear);
      return res.status(200).json(getBodiesByYear);
    } catch (e) {
      next(e);
    }
  }
}

export = bodyController;
