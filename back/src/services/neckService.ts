import Neck from "../models/Neck.model";
// import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class neckService {
  //// 모든 거북목 테스트 결과 조회
  static async getAllNecks() {
    const allNecks = await Neck.findAll();
    const countNecks = await Neck.countAll();
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
    const Necks = await Neck.findByUserId({ user_id });
    const countNecks = await Neck.countByUserId({ user_id });

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
    const newNeck = await Neck.create({
      neck_id,
      user_id,
      result,
      score,
      filename,
    });

    const result_success = Object.assign({
      result: true,
      message: `거북목 결과 기록이 성공적으로 이뤄졌습니다.`,
    });
    return result_success;
  }

  //// 특정 유저의 거북목 기록 조회 - year
  static async getNecksByYear({ user_id, year }) {
    const Necks = await Neck.findByUserIdYear({ user_id, year });

    const result_success = Object.assign({
      result: true,
      message: `해당 유저의 거북목 기록 조회가 성공적으로 이뤄졌습니다.`,
      list: Necks,
    });
    return result_success;
  }
}

export = neckService;
