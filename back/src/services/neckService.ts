import User from "../db/models/User";
import Neck from "../db/models/Neck";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class neckService {
  //// 모든 사용자 조회
  static async getAllNecks() {
    const allNecks = await Neck.findAll();
    const allNecksString = JSON.stringify(allNecks);
    const allNecksObject = JSON.parse(allNecksString);
    for (let i = 0; i < allNecksObject.length; i++) {
      delete allNecksObject[i].user_id;
    }
    const countNecks = await Neck.countAll();
    const countNecksString = JSON.stringify(countNecks);
    const countNecksObject = JSON.parse(countNecksString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 거북목 결과 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countNecksObject[0].cnt, list: allNecksObject }
    );
    return result_success;
  }

  //// 거북목 테스트 결과 기록
  static async addNeck({ user_id, result, score, filename }) {
    const neck_id = uuidv4();
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const newNeck = await Neck.create({
      neck_id,
      user_id,
      result,
      score,
      filename,
      created_at,
    });
    const newNeckString = JSON.stringify(newNeck);
    const newNeckObject = JSON.parse(newNeckString);
    for (let i = 0; i < newNeckObject.length; i++) {
      delete newNeckObject[i].user_id;
    }
    const result_success = Object.assign({
      result: true,
      cause: "success",
      message: `거북목 결과 기록이 성공적으로 이뤄졌습니다.`,
    });
    return result_success;
  }
}

export = neckService;
