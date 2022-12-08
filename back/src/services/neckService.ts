import Neck from "../db/models/Neck";
import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class neckService {
  //// 모든 거북목 테스트 결과 조회
  static async getAllNecks() {
    const allNecks = nullPrototypeHandler(await Neck.findAll());
    const countNecks = nullPrototypeHandler(await Neck.countAll());
    const result_success = Object.assign(
      {
        result: true,
        message: `모든 거북목 결과 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countNecks[0].cnt, list: allNecks }
    );
    return result_success;
  }

  //// 특정 유저의 거북목 테스트 결과 조회
  static async getNecks({ user_id }) {
    const Necks = nullPrototypeHandler(await Neck.findByUserId({ user_id }));
    const countNecks = nullPrototypeHandler(
      await Neck.countByUserId({ user_id })
    );
    const result_success = Object.assign(
      {
        result: true,
        message: `해당 유저의 거북목 결과 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countNecks[0].cnt, list: Necks }
    );
    return result_success;
  }

  //// 거북목 테스트 결과 기록
  static async addNeck({ user_id, result, score, filename }) {
    const neck_id = uuidv4();
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const newNeck = nullPrototypeHandler(
      await Neck.create({
        neck_id,
        user_id,
        result,
        score,
        filename,
        created_at,
      })
    );
    const result_success = Object.assign({
      result: true,
      message: `거북목 결과 기록이 성공적으로 이뤄졌습니다.`,
    });
    return result_success;
  }
}

export = neckService;
