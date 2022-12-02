import Body from "../db/models/Body";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class bodyService {
  //// 전체 운동 기록 조회 기능
  static async getAllBodies() {
    const allBodies = await Body.findAll();
    const allBodiesString = JSON.stringify(allBodies);
    const allBodiesObject = JSON.parse(allBodiesString);
    for (let i = 0; i < allBodiesObject.length; i++) {
      delete allBodiesObject[i].user_id;
    }
    const countBodies = await Body.countAll();
    const countBodiesString = JSON.stringify(countBodies);
    const countBodiesObject = JSON.parse(countBodiesString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `전체 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countBodiesObject[0].cnt, list: allBodiesObject }
    );
    return result_success;
  }

  //// 특정 유저의 운동 기록 조회
  static async getBodies({ user_id }) {
    const Bodies = await Body.findByUserId({ user_id });
    const BodiesString = JSON.stringify(Bodies);
    const BodiesObject = JSON.parse(BodiesString);
    for (let i = 0; i < BodiesObject.length; i++) {
      delete BodiesObject[i].user_id;
    }
    const countBodies = await Body.countByUserId({ user_id });
    const countBodiesString = JSON.stringify(countBodies);
    const countBodiesObject = JSON.parse(countBodiesString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countBodiesObject[0].cnt, list: BodiesObject }
    );
    return result_success;
  }

  //// 특정 유저의 운동 기록 시작
  static async addBody({ user_id, tag }) {
    const body_id = uuidv4();
    const start_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const newBody = await Body.create({
      body_id,
      user_id,
      tag,
      start_time,
    });
    const newBodyString = JSON.stringify(newBody);
    const newBodyObject = JSON.parse(newBodyString);
    for (let i = 0; i < newBodyObject.length; i++) {
      delete newBodyObject[i].user_id;
    }
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 유저의 운동 기록 시작이 성공적으로 이뤄졌습니다.`,
      },
      { body_id: body_id }
    );
    return result_success;
  }

  //// 특정 유저의 운동 기록 종료
  static async updateBody({ body_id }) {
    const checkBody = await Body.findByBodyId({ body_id });
    const checkBodyString = JSON.stringify(checkBody);
    const checkBodyObject = JSON.parse(checkBodyString);
    if (checkBodyObject.length == 0) {
      const result_errBody = {
        result: false,
        cause: "DB",
        message:
          "patch를 요청한 body_id 정보와 일치하는 데이터가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errBody;
    } else if (checkBodyObject[0].end_time) {
      const result_errBody = {
        result: false,
        cause: "end_time",
        message:
          "patch를 요청한 body_id의 end_time은 이미 업데이트 되어있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errBody;
    }
    const end_time = moment().format("YYYY-MM-DD HH:mm:ss");
    const newBody = await Body.patch({
      body_id,
      end_time,
    });
    const newBodyString = JSON.stringify(newBody);
    const newBodyObject = JSON.parse(newBodyString);
    for (let i = 0; i < newBodyObject.length; i++) {
      delete newBodyObject[i].user_id;
    }
    const result_success = Object.assign({
      result: true,
      cause: "success",
      message: `해당 유저의 운동 기록 종료가 성공적으로 이뤄졌습니다.`,
    });
    return result_success;
  }

  //// 특정 유저의 운동 기록 조회 - monthly
  static async getBodiesByMonth({ user_id, year }) {
    const Bodies = await Body.findByUserIdMonth({ user_id, year });
    const BodiesString = JSON.stringify(Bodies);
    const BodiesObject = JSON.parse(BodiesString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 유저의 운동 기록 조회가 성공적으로 이뤄졌습니다.`,
      },
      { list: BodiesObject }
    );
    return result_success;
  }
}

export = bodyService;
