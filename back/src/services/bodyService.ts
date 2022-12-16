// import Body from "../db/models/Body";
import Body from "../models/Body.model";
import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import * as ClientError from "../responses/clientErrorResponse";
import * as ServerError from "../responses/serverErrorResponse";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class bodyService {
  //// 전체 운동 기록 조회 기능
  static async getAllBodies() {
    const allBodies = await Body.findAll();
    const countBodies = await Body.countAll();
    const result_success = Object.assign({
      result: true,
      message: `전체 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      count: countBodies[0].cnt,
      list: allBodies,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 조회
  static async getBodies({ user_id }) {
    const Bodies = await Body.findByUserId({ user_id });
    const countBodies = await Body.countByUserId({ user_id });
    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      count: countBodies[0].cnt,
      list: Bodies,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 시작
  static async addBody({ user_id, tag }) {
    const body_id = uuidv4();
    // const start_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const newBody = await Body.create({
      body_id,
      user_id,
      tag,
      // start_time,
    });
    // console.log("result of query: ", newBody);
    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 운동 기록 시작이 성공적으로 이뤄졌습니다.`,
      body_id: body_id,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 종료
  static async updateBody({ body_id }) {
    const checkBody = nullPrototypeHandler(
      await Body.findByBodyId({ body_id })
    );
    if (checkBody.length == 0) {
      return ClientError.notFound(
        "patch를 요청한 body_id 정보와 일치하는 데이터가 없습니다. 다시 한 번 확인해 주세요."
      );
    } else if (checkBody[0].end_time) {
      return ClientError.conflict(
        "patch를 요청한 body_id의 end_time은 이미 업데이트 되어있습니다. 다시 한 번 확인해 주세요."
      );
    }
    const end_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const newBody = await Body.patch({
      body_id,
      end_time,
    });

    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 운동 기록 종료가 성공적으로 이뤄졌습니다.`,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 조회 - week
  static async getBodiesByWeek({ user_id, year, week }) {
    const Bodies = nullPrototypeHandler(
      await Body.findByUserIdWeek({ user_id, year, week })
    );
    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      list: Bodies,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 조회 - year
  static async getBodiesByYear({ user_id, year }) {
    const Bodies = nullPrototypeHandler(
      await Body.findByUserIdYear({ user_id, year })
    );
    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      list: Bodies,
    });
    return result_success;
  }
}

export = bodyService;
