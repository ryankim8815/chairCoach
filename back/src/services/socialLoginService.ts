import User from "../db/models/User";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class socialLoginService {
  ////////////////////////////////////////
  /////////////  카  카  오  ///////////////
  ////////////////////////////////////////
  //// 카카오 간편로그인 가입 & 로그인
  static async kakao({ email, access_token }) {
    // email 확인
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (
      checkEmailObject.length !== 0 &&
      checkEmailObject[0].provider !== "kakao"
    ) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "kakao 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    } else if (
      checkEmailObject.length == 1 &&
      checkEmailObject[0].provider == "kakao"
    ) {
      // 기존 가입자 로그인(토큰 발급)
      const thisUser = checkEmailObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else if (checkEmailObject.length > 1) {
      const result_errDB = Object.assign({
        result: false,
        cause: "DB",
        message: `[확인요망]: DB에 해당 이메일(${email})로 가입된 사용자가 1명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.`,
      });
      return result_errDB;
    }
    // 신규 가입자 DB저장
    // UUID 생성
    const user_id = uuidv4();
    // password
    const password = access_token;
    // nickname
    const nickname = `${email}_kakao`;
    // provider
    const provider = "kakao";
    // created_time
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 사용자 추가
    const newUser = await User.create({
      user_id,
      email,
      password,
      nickname,
      provider,
      created_at,
    });
    const newUserString = JSON.stringify(newUser);
    const newUserObject = JSON.parse(newUserString);
    const checkNewUser = await User.findByEmail({ email });
    const checkNewUserString = JSON.stringify(checkNewUser);
    const checkNewUserObject = JSON.parse(checkNewUserString);
    if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
      // 토큰 발급
      const thisUser = checkNewUserObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else {
      const result_errDB = {
        result: false,
        cause: "DB",
        message: `[확인요망]: 사용자 정보를 DB에 저장 중 오류가 발생했습니다.`,
      };
      return result_errDB;
    }
  }

  ////////////////////////////////////////
  /////////////  네  이  버  ///////////////
  ////////////////////////////////////////
  //// 네이버 간편로그인 가입 & 로그인
  static async naver({ email, access_token }) {
    // email 확인
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (
      checkEmailObject.length !== 0 &&
      checkEmailObject[0].provider !== "naver"
    ) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "naver 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    } else if (
      checkEmailObject.length == 1 &&
      checkEmailObject[0].provider == "naver"
    ) {
      // 기존 가입자 로그인(토큰 발급)
      const thisUser = checkEmailObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else if (checkEmailObject.length > 1) {
      const result_errDB = Object.assign({
        result: false,
        cause: "DB",
        message: `[확인요망]: DB에 해당 이메일(${email})로 가입된 사용자가 1명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.`,
      });
      return result_errDB;
    }
    // 신규 가입자 DB저장
    // UUID 생성
    const user_id = uuidv4();
    // password
    const password = access_token;
    // nickname
    const nickname = `${email}_naver`;
    // provider
    const provider = "naver";
    // created_time
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 사용자 추가
    const newUser = await User.create({
      user_id,
      email,
      password,
      nickname,
      provider,
      created_at,
    });
    const newUserString = JSON.stringify(newUser);
    const newUserObject = JSON.parse(newUserString);
    const checkNewUser = await User.findByEmail({ email });
    const checkNewUserString = JSON.stringify(checkNewUser);
    const checkNewUserObject = JSON.parse(checkNewUserString);
    if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
      // 토큰 발급
      const thisUser = checkNewUserObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else {
      const result_errDB = {
        result: false,
        cause: "DB",
        message: `[확인요망]: 사용자 정보를 DB에 저장 중 오류가 발생했습니다.`,
      };
      return result_errDB;
    }
  }

  ////////////////////////////////////////
  /////////////   구   글   ///////////////
  ////////////////////////////////////////
  //// 네이버 간편로그인 가입 & 로그인
  static async google({ email, refresh_token }) {
    // email 확인
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (
      checkEmailObject.length !== 0 &&
      checkEmailObject[0].provider !== "google"
    ) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "google 계정의 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    } else if (
      checkEmailObject.length == 1 &&
      checkEmailObject[0].provider == "google"
    ) {
      // 기존 가입자 로그인(토큰 발급)
      const thisUser = checkEmailObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else if (checkEmailObject.length > 1) {
      const result_errDB = Object.assign({
        result: false,
        cause: "DB",
        message: `[확인요망]: DB에 해당 이메일(${email})로 가입된 사용자가 1명 이상입니다. 정책상 이메일 하나로 계정 하나만 생성 가능 합니다.`,
      });
      return result_errDB;
    }
    // 신규 가입자 DB저장
    // UUID 생성
    const user_id = uuidv4();
    // password
    const password = refresh_token;
    // nickname
    const nickname = `${email}_google`;
    // provider
    const provider = "google";
    // created_time
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    // 사용자 추가
    const newUser = await User.create({
      user_id,
      email,
      password,
      nickname,
      provider,
      created_at,
    });
    const newUserString = JSON.stringify(newUser);
    const newUserObject = JSON.parse(newUserString);
    const checkNewUser = await User.findByEmail({ email });
    const checkNewUserString = JSON.stringify(checkNewUser);
    const checkNewUserObject = JSON.parse(checkNewUserString);
    if (newUserObject.affectedRows == 1 && checkNewUserObject.length == 1) {
      // 토큰 발급
      const thisUser = checkNewUserObject[0];
      const secretKey = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ email: email }, secretKey);
      delete thisUser.password;
      delete thisUser.user_id;
      const result_success = Object.assign(
        {
          result: true,
          cause: "success",
          message: `${thisUser.nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
        },
        { token: token },
        thisUser
      );
      return result_success;
    } else {
      const result_errDB = {
        result: false,
        cause: "DB",
        message: `[확인요망]: 사용자 정보를 DB에 저장 중 오류가 발생했습니다.`,
      };
      return result_errDB;
    }
  }
}

export = socialLoginService;
