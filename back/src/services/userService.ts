import User from "../db/models/User";
import Code from "../db/models/Code";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class userService {
  //// 모든 사용자 조회
  static async getAllUsers() {
    const allUsers = await User.findAll();
    const allUsersString = JSON.stringify(allUsers);
    const allUsersObject = JSON.parse(allUsersString);
    const countUsers = await User.countAll();
    const countUsersString = JSON.stringify(countUsers);
    const countUsersObject = JSON.parse(countUsersString);
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `모든 사용자 조회가 성공적으로 이뤄졌습니다.`,
      },
      { count: countUsersObject[0].cnt, list: allUsersObject }
    );
    return result_success;
  }

  //// 현재 사용자 조회
  static async getCurrentUser({ user_id }) {
    const currentUser = await User.findByUserId({ user_id });
    const currentUserString = JSON.stringify(currentUser);
    const currentUserObject = JSON.parse(currentUserString);
    // 쿼리문의 SELECT로 대체
    for (let i = 0; i < currentUserObject.length; i++) {
      delete currentUserObject[i].password;
      delete currentUserObject[i].user_id;
    }
    if (currentUserObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "입력하신 user_id로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    } else if (currentUserObject.length > 1) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "[확인요망]: 해당 user_id로 조회된 계정이 DB상 두개 이상입니다. 확인해 주세요.",
      };
      return result_errUserId;
    }
    const thisUser = currentUserObject[0];
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `해당 사용자 조회가 성공적으로 이뤄졌습니다.`,
      },
      thisUser
    );
    return result_success;
  }
  //// 로그인용 사용자 조회
  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    const userString = JSON.stringify(user);
    const userObject = JSON.parse(userString);
    if (userObject.length === 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    const thisUser = userObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: thisUser.user_id }, secretKey);
    delete thisUser.password;
    delete thisUser.user_id;
    const result_success = Object.assign(
      {
        result: true,
        cause: "success",
        message: `${thisUser.nickname}님의 로그인이 성공적으로 이뤄졌습니다.`,
        token: token,
      },
      { token: token },
      thisUser
    );
    return result_success;
  }

  //// 자체 회원가입
  static async addUser({ email, password, nickname }) {
    const checkEmail = await User.findByEmail({ email });
    const checkEmailString = JSON.stringify(checkEmail);
    const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmailObject.length !== 0) {
      const result_errEmail = {
        result: false,
        cause: "email",
        message:
          "입력하신 email로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errEmail;
    }
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname로 이미 가입된 내역이 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errNickname;
    }
    const user_id = uuidv4();
    password = await bcrypt.hash(password, 10);
    const provider = "chairCoach";
    const created_at = moment().format("YYYY-MM-DD HH:mm:ss");
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
      const deleteCode = await Code.delete({
        email,
      });
      const deleteCodeString = JSON.stringify(deleteCode);
      const deleteCodeObject = JSON.parse(deleteCodeString);
      if (deleteCodeObject.affectedRows == 1) {
        const result_success = {
          result: true,
          cause: "success",
          message: `${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
        };
        return result_success;
      }
    }
  }

  //// 회원 정보 수정
  static async updateUser({ user_id, currentPassword, password, nickname }) {
    const checkUserId = await User.findByUserId({ user_id });
    const checkUserIdString = JSON.stringify(checkUserId);
    const checkUserIdObject = JSON.parse(checkUserIdString);
    if (checkUserIdObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "입력하신 user_id로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    const thisUser = checkUserIdObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    const checkNickname = await User.findByNickname({ nickname });
    const checkNicknameString = JSON.stringify(checkNickname);
    const checkNicknameObject = JSON.parse(checkNicknameString);
    if (
      checkNicknameObject.length == 1 &&
      checkNicknameObject[0].user_id == user_id
    ) {
      console.log(
        "안내: 입력된 nickname은 기존 nickname과 동일하며, 회원정보 수정이 계속 진행됩니다."
      );
    } else if (checkNicknameObject.length !== 0) {
      const result_errNickname = {
        result: false,
        cause: "nickname",
        message:
          "입력하신 nickname으로 이미 가입된 사용자가 있습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errNickname;
    }
    password = await bcrypt.hash(password, 10);
    const updatedUser = await User.update({
      user_id,
      password,
      nickname,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    if (updatedUserObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원정보 수정이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }

  //// 회원정보 삭제
  static async deleteUser({ user_id, password }) {
    const checkUserId = await User.findByUserId({ user_id });
    const checkUserIdString = JSON.stringify(checkUserId);
    const checkUserIdObject = JSON.parse(checkUserIdString);
    if (checkUserIdObject.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "요청하신 user_id로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    }
    const thisUser = checkUserIdObject[0];
    const hashedCorrectPassword = thisUser.password;

    const isPasswordCorrect = await bcrypt.compare(
      password,
      hashedCorrectPassword
    );
    if (!isPasswordCorrect) {
      const result_errPassword = {
        result: false,
        cause: "password",
        message:
          "입력하신 password가 일치하지 않습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errPassword;
    }
    const updatedUser = await User.delete({
      user_id,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    const checkUpdatedUser = await User.findByUserId({ user_id });
    const checkUpdatedUserString = JSON.stringify(checkUpdatedUser);
    const checkUpdatedUserObject = JSON.parse(checkUpdatedUserString);
    if (
      updatedUserObject.affectedRows !== 1 &&
      checkUpdatedUserObject.length !== 0
    ) {
      const result_errDelete = {
        result: true,
        cause: "delete",
        message: `${checkUserIdObject[0].nickname}님의 회원정보 삭제를 실패했습니다.`,
      };
      return result_errDelete;
    } else if (
      updatedUserObject.affectedRows == 1 &&
      checkUpdatedUserObject.length == 0
    ) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${checkUserIdObject[0].nickname}님의 회원정보 삭제가 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
  /////////////////////////////////
  //// 회원가입 전 이메일 인증
  // [추가기능 고민 사항]: 1) 회원가입 여부 확인 고민,    2) 코드 expire period 지정 기능
  static async sendCode({ email, code }) {
    const saveCode = await Code.create({
      email,
      code,
    });
    const saveCodeString = JSON.stringify(saveCode);
    const saveCodeObject = JSON.parse(saveCodeString);
    if (saveCodeObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `code 발급이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    } else if (saveCodeObject.affectedRows == 2) {
      const result_success = {
        result: true,
        cause: "success",
        message: `code 재발급이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
}
export = userService;
