import User from "../db/models/User";
import Code from "../db/models/Code";
import { nullPrototypeHandler } from "../utils/nullPrototypeHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

class userService {
  //// 모든 사용자 조회
  static async getAllUsers() {
    const allUsers = nullPrototypeHandler(await User.findAll());
    const countUsers = nullPrototypeHandler(await User.countAll());
    return { count: countUsers[0].cnt, list: allUsers };
  }

  //// 현재 사용자 조회
  static async getCurrentUser({ user_id }) {
    const currentUser = nullPrototypeHandler(
      await User.findByUserId({ user_id })
    );
    // for (let i = 0; i < currentUser.length; i++) {
    //   delete currentUser[i].password;
    // }
    if (currentUser.length === 0) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "입력하신 user_id로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
      };
      return result_errUserId;
    } else if (currentUser.length > 1) {
      const result_errUserId = {
        result: false,
        cause: "user_id",
        message:
          "[확인요망]: 해당 user_id로 조회된 계정이 DB상 두개 이상입니다. 확인해 주세요.",
      };
      return result_errUserId;
    }
    const thisUser = currentUser[0];
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
    // 탈퇴한 사용자가 30일 이내 로그인 시도 시
    if (userObject[0].status == "pending") {
      const user_id = thisUser.user_id;
      const withdrawnUser = await User.undoWithdraw({ user_id });
      const withdrawnUserString = JSON.stringify(withdrawnUser);
      const withdrawnUserObject = JSON.parse(withdrawnUserString);
      if (withdrawnUserObject.affectedRows === 0) {
        const result_err = {
          result: false,
          cause: "status",
          message: "탈퇴한 사용자 계정 복구 과정에서 오류가 발생했습니다.",
        };
        return result_err;
      } else {
        thisUser.status = null;
      }
    }
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: thisUser.user_id }, secretKey);
    delete thisUser.password;
    // delete thisUser.user_id;
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
      // const deleteCode = await Code.delete({
      //   email,
      // });
      // const deleteCodeString = JSON.stringify(deleteCode);
      // const deleteCodeObject = JSON.parse(deleteCodeString);
      // if (deleteCodeObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
      // }
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
      // console.log(
      //   "안내: 입력된 nickname은 기존 nickname과 동일하며, 회원정보 수정이 계속 진행됩니다."
      // );
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

  //// 회원정보 삭제 -> 탈퇴
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
    const updatedUser = await User.withdraw({
      user_id,
    });
    const updatedUserString = JSON.stringify(updatedUser);
    const updatedUserObject = JSON.parse(updatedUserString);
    if (updatedUserObject.affectedRows == 1) {
      const result_success = {
        result: true,
        cause: "success",
        message: `${checkUserIdObject[0].nickname}님의 탈퇴가 성공적으로 이뤄졌습니다. 30일 후 회원 정보가 삭제됩니다.`,
        // withdraw_at: updatedUser,
      };
      return result_success;
    }
  }

  //// 회원가입 전 이메일 인증
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
        // code: code,
      };
      return result_success;
    } else if (saveCodeObject.affectedRows == 2) {
      const result_success = {
        result: true,
        cause: "success",
        message: `code 재발급이 성공적으로 이뤄졌습니다.`,
        // code: code,
      };
      return result_success;
    }
  }
  //// 이메일 인증 코드 확인 절차
  static async verifyCode({ email, code }) {
    const checkCode = await Code.findByEmail({
      email,
    });
    const checkCodeString = JSON.stringify(checkCode);
    const checkCodeObject = JSON.parse(checkCodeString);
    if (checkCodeObject.length !== 1) {
      const result_err = {
        result: false,
        cause: "code",
        message: `email 인증에 실패했습니다.`,
      };
      return result_err;
    } else {
      const correctCode = checkCodeObject[0];
      if (code == correctCode.code) {
        const deleteCode = await Code.delete({
          email,
        });
        const deleteCodeString = JSON.stringify(deleteCode);
        const deleteCodeObject = JSON.parse(deleteCodeString);
        if (deleteCodeObject.affectedRows !== 1) {
          const result_err = {
            result: false,
            cause: "code",
            message: `email 인증에 실패했습니다.`,
          };
          return result_err;
        }
        const result_success = {
          result: true,
          cause: "success",
          message: `email 인증에 성공했습니다.`,
        };
        return result_success;
      } else {
        const result_err = {
          result: false,
          cause: "code",
          message: `email 인증에 실패했습니다.`,
        };
        return result_err;
      }
    }
  }

  //// 회원가입 전 nickname 중복확인
  static async nicknameDuplicateCheck({ nickname }) {
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
    } else {
      const result_success = {
        result: true,
        cause: "success",
        message: `중복된 nickname이 없습니다. 가입을 진행해주세요.`,
      };
      return result_success;
    }
  }

  //// 회원가입 전 password 중복확인
  static async passwordCheck({ user_id, password }) {
    try {
      const checkPassword = await User.findByUserId({ user_id });
      const checkPasswordString = JSON.stringify(checkPassword);
      const checkPasswordObject = JSON.parse(checkPasswordString);
      if (checkPasswordObject.length == 0) {
        const result_err = {
          result: false,
          cause: "user_id",
          message:
            "요청하신 계정으로 가입된 내역이 없습니다. 다시 한 번 확인해 주세요.",
        };
        return result_err;
      } else {
        const thisUser = checkPasswordObject[0];
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
        } else {
          const result_success = {
            result: true,
            cause: "success",
            message: `입력하신 password가 일치합니다.`,
          };
          return result_success;
        }
      }
    } catch (error) {
      const result_err = {
        result: false,
        cause: "service",
        message: "[확인요망]: userPassword api에서 오류가 발생했습니다.",
      };
      return result_err;
    }
  }

  //// 알람 설정
  static async setAlert({ user_id, alert, timer }) {
    const setAlert = await User.updateAlert({ user_id, alert, timer });
    const setAlertString = JSON.stringify(setAlert);
    const setAlertObject = JSON.parse(setAlertString);
    if (setAlertObject.affectedRows !== 1) {
      const result_err = {
        result: false,
        cause: "DB",
        message: "요청 처리에 실패했습니다. 요청값을 다시 한 번 확인해 주세요.",
      };
      return result_err;
    } else {
      const result_success = {
        result: true,
        cause: "success",
        message: `Alert 업데이트가 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }
}
export = userService;
