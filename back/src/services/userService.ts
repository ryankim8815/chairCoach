// import User from "../db/models/User";
// import Code from "../db/models/Code";
import User from "../models/User.model";
import Code from "../models/Code.model";
import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import * as ClientError from "../responses/clientErrorResponse";
import * as ServerError from "../responses/serverErrorResponse";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
import Token from "../models/Token.model";
import { db } from "../models";
moment.tz.setDefault("Asia/Seoul");

class userService {
  //// 모든 사용자 조회
  static async getAllUsers() {
    const allUsers = await User.findAll();
    const countUsers = await User.countAll();
    return { count: countUsers[0].cnt, list: allUsers };
  }

  //// 현재 사용자 조회
  static async getCurrentUser({ user_id }) {
    const currentUser = await User.findByUserId({ user_id });
    if (currentUser.length === 0) {
      throw ClientError.notFound(
        "정상적으로 로그인된 사용자의 요청이 아닙니다."
      );
    }
    if (currentUser.length > 1) {
      throw ServerError.internalServerError(
        "[확인요망]: 해당 user_id로 조회된 계정이 DB상 두개 이상입니다. 확인해 주세요."
      );
    }
    const thisUser = currentUser[0];
    delete thisUser.password;
    const result_success = Object.assign(
      {
        result: true,
        message: `해당 사용자 조회가 성공적으로 이뤄졌습니다.`,
      },
      thisUser
    );
    return result_success;
  }
  //// 로그인용 사용자 조회
  static async getUser({ email, password, ipAddress }) {
    const user = await User.findByEmail({ email });
    if (user.length === 0) {
      throw ClientError.unauthorized(
        "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const thisUser = user[0];
    const hashedCorrectPassword = thisUser.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      throw ClientError.unauthorized(
        "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    // 탈퇴한 사용자가 30일 이내 로그인 시도 시
    if (user[0].status == "pending") {
      const user_id = thisUser.user_id;
      const withdrawnUser = await User.undoWithdraw({ user_id });
      if (withdrawnUser[1] === 0) {
        throw ServerError.internalServerError(
          "[확인요망] 탈퇴한 사용자 계정 복구 과정에서 오류가 발생했습니다."
        );
      } else {
        thisUser.status = null;
        thisUser.withdraw_at = null;
      }
    }
    // token update
    const secretKey = process.env.JWT_SECRET_KEY;
    // const token = jwt.sign(
    //   {
    //     exp: Math.floor(Date.now() / 1000) + 60 * 60, // sec, 1hour
    //     user_id: thisUser.user_id,
    //   },
    //   secretKey
    // );
    const accessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // sec, 1day
        user_id: thisUser.user_id,
      },
      secretKey
    );
    const refreshToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // sec, 1week
        user_id: thisUser.user_id,
      },
      secretKey
    );
    const status = "valid";
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
    const user_id = thisUser.user_id;
    const tokenUpdate = await Token.update({
      user_id,
      refreshToken,
      accessToken,
      ipAddress,
      status,
      created_at,
    });
    if (tokenUpdate[1]) {
      delete thisUser.password;
      const result_success = Object.assign(
        {
          result: true,
          message: `로그인이 성공적으로 이뤄졌습니다.`,
          // token: token,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        thisUser
      );
      return result_success;
    }
  }

  ///////////////////////////
  //// 자체 회원가입 로직 시작/////
  ///////////////////////////
  //
  //// 회원가입 전 이메일 인증
  static async sendCode({ email, code }) {
    const saveCode = await Code.create({
      email,
      code,
    });
    if (saveCode[0].affectedRows > 0) {
      const result = {
        result: true,
        message: `code 발급이 성공적으로 이뤄졌습니다.`,
      };
      return result;
    }
  }

  //// 이메일 인증 코드 확인 절차
  static async verifyCode({ email, code }) {
    const checkCode = await Code.findByEmail({
      email,
    });
    if (checkCode.length == 0) {
      throw ClientError.unauthorized(
        "해당 이메일에 발급된 코드가 만료되었습니다."
      );
    }
    if (checkCode.length > 1) {
      throw ServerError.internalServerError(
        "[확인요망] 이메일 인증 코드 확인 과정에서 오류가 발견되었습니다."
      );
    }
    const isCorrectCode = code == checkCode[0].code;
    if (!isCorrectCode)
      throw ClientError.unauthorized("email 인증에 실패했습니다.");
    if (isCorrectCode) {
      const deleteCode = await Code.delete({
        email,
      });
      const result_success = {
        result: true,
        message: `email 인증에 성공했습니다.`,
      };
      return result_success;
    }
  }

  //// 회원가입 전 nickname 중복확인
  static async nicknameDuplicateCheck({ nickname }) {
    const checkNickname = await User.findByNickname({ nickname });
    if (checkNickname.length !== 0) {
      throw ClientError.conflict("입력하신 nickname은 이미 사용중입니다.");
    }
    const result_success = {
      result: true,
      message: `중복된 nickname이 없습니다. 가입을 진행해주세요.`,
    };
    return result_success;
  }

  //// 자체 회원가입
  static async addUser({ email, password, nickname, ipAddress }) {
    const transaction = await db.sequelize.transaction();
    try {
      const user_id = uuidv4();
      password = await bcrypt.hash(password, 10);
      const provider = "chairCoach";
      const newUser = await User.create({
        user_id,
        email,
        password,
        nickname,
        provider,
        transaction,
      });
      const secretKey = process.env.JWT_SECRET_KEY;
      // const token = jwt.sign(
      //   {
      //     exp: Math.floor(Date.now() / 1000) + 60 * 60, // sec, 1hour
      //     user_id: user_id,
      //   },
      //   secretKey
      // );
      const accessToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // sec, 1day
          user_id: user_id,
        },
        secretKey
      );
      const refreshToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // sec, 1week
          user_id: user_id,
        },
        secretKey
      );

      const tokenCreate = await Token.create({
        user_id,
        refreshToken,
        accessToken,
        ipAddress,
        transaction,
      });
      // console.log("tokenCreate: ", tokenCreate);
      // 트랜젝션 적용=============================================================================
      if (newUser[1] && tokenCreate[1]) {
        const result_success = {
          result: true,
          message: `회원가입이 성공적으로 이뤄졌습니다.`,
          // token: token,
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
        await transaction.commit();
        return result_success;
      }
      throw ServerError.internalServerError("[확인요망]: DB확인이 필요합니다.");
    } catch (e) {
      await transaction.rollback();
      throw ServerError.internalServerError(`[확인요망]: transaction - ${e}`);
    }
  }
  //
  ///////////////////////////
  //// 자체 회원가입 로직 종료/////
  ///////////////////////////

  //// 회원정보 수정을 위한 비밀번호 확인
  static async passwordCheck({ user_id, password }) {
    // try {
    const checkPassword = await User.findByUserId({ user_id });
    if (checkPassword.length == 0) {
      throw ClientError.unauthorized(
        "요청하신 정보로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const thisUser = checkPassword[0];
    const hashedCorrectPassword = thisUser.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      throw ClientError.unauthorized(
        "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    const result_success = {
      result: true,
      message: `입력하신 password가 일치합니다.`,
    };
    return result_success;
  }

  //// 회원 정보 수정
  static async updateUser({ user_id, password, nickname }) {
    password = await bcrypt.hash(password, 10);
    const updatedUser = await User.update({
      user_id,
      password,
      nickname,
    });
    if (updatedUser[1] !== 1)
      throw ServerError.internalServerError(
        "[확인요망] 업데이트 과정트서 오류가 발견되었습니다."
      );
    const result_success = {
      result: true,
      message: `회원정보 수정이 성공적으로 이뤄졌습니다.`,
    };
    return result_success;
  }

  //// 회원 정보 수정 - 간편로그인 회원용
  static async updateSocialLoginUser({ user_id, provider, nickname }) {
    const updatedUser = await User.updateNickname({
      user_id,
      provider,
      nickname,
    });
    if (updatedUser[1] !== 1)
      throw ServerError.internalServerError(
        "[확인요망] 업데이트 과정트서 오류가 발견되었습니다."
      );
    const result_success = {
      result: true,
      message: `회원정보 수정이 성공적으로 이뤄졌습니다.`,
    };
    return result_success;
  }

  //// 회원정보 삭제 -> 탈퇴
  static async deleteUser({ user_id, password }) {
    const checkUserId = nullPrototypeHandler(
      await User.findByUserId({ user_id })
    );
    if (checkUserId.length === 0) {
      throw ClientError.unauthorized(
        "요청하신 정보로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요."
      );
    }
    const thisUser = checkUserId[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      throw ClientError.unauthorized(
        "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요."
      );
    }
    const updatedUser = nullPrototypeHandler(
      await User.withdraw({
        user_id,
      })
    );
    if (updatedUser[1] !== 1)
      throw ServerError.internalServerError(
        "[확인요망] 탈퇴 과정에서 오류가 발견되었습니다."
      );
    const result_success = {
      result: true,
      message: `탈퇴가 성공적으로 이뤄졌습니다. 30일 후 회원 정보가 삭제됩니다.`,
    };
    return result_success;
  }

  //// 알람 설정
  static async setAlert({ user_id, alert, timer }) {
    const setAlert = await User.updateAlert({ user_id, alert, timer });
    if (setAlert[1] !== 1)
      throw ServerError.internalServerError(
        "[확인요망] 기존값과 동일한 요청이거나 서버 오류입니다."
      );
    const result_success = {
      result: true,
      message: `Alert 업데이트가 성공적으로 이뤄졌습니다.`,
    };
    return result_success;
  }
}
export = userService;
