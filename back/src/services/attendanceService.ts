import User from "../db/models/User";
import Attendance from "../db/models/Attendance";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class attendanceService {
  //// 출석 생성
  static async createAtnd({ email }) {
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    const user_id = userObject[0].user_id; // 예외처리 필요
    const created_at_date = created_at.split(" ")[0]; // 콘솔 찍으면 T로 나눠야할 수도
    const checkToday = await Attendance.findByCreatedAtDateUserId({
      created_at_date,
      user_id,
    });
    const checkTodayString = JSON.stringify(checkToday);
    const checkTodayObject = JSON.parse(checkTodayString);
    // 출석 기록이 있는 경우
    if (checkTodayObject.length > 0) {
      const result_errUpdate = {
        result: false,
        cause: "attendance",
        message: `금일 출석체크가 완료된 사용자입니다.`,
      };
      return result_errUpdate;
    } else {
      const atnd_id = uuidv4();
      const newAtnd = await Attendance.create({
        atnd_id,
        user_id,
        created_at,
      });
      const newAtndString = JSON.stringify(newAtnd);
      const newAtndObject = JSON.parse(newAtndString);
      const affectedRows = newAtndObject.affectedRows;
      const checkNewAtnd = await Attendance.findByAtndId({ atnd_id });
      const checkNewAtndString = JSON.stringify(checkNewAtnd);
      const checkNewAtndObject = JSON.parse(checkNewAtndString);
      if (affectedRows == 1 && checkNewAtndObject.length == 1) {
        const result_success = {
          result: true,
          cause: "success",
          message: `출가체크가 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      } else {
        const result_errCreate = {
          result: false,
          cause: "create",
          message: `출석체크 생성 중에 문제가 발생했습니다.`,
        };
        return result_errCreate;
      }
    }
  }
}
export = attendanceService;
