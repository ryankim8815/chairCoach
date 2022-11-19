import User from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import fs from "fs";   // (FE요청) 삭제
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
    // const countUsers = await User.countAll();
    // const countUsersString = JSON.stringify(countUsers);
    // const countUsersObject = JSON.parse(countUsersString);
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
    // UUID 생성
    const user_id = uuidv4();
    // 비밀번호 해쉬화
    password = await bcrypt.hash(password, 10);
    // provider
    const provider = "chairCoach";
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
      const result_success = {
        result: true,
        cause: "success",
        message: `${nickname}님의 회원가입이 성공적으로 이뤄졌습니다.`,
      };
      return result_success;
    }
  }

  //// 회원 정보 수정
  static async updateUser({ user_id, currentPassword, password, nickname }) {
    // user_id 확인
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
    // 기존 비밀번호 확인
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
    // nickname 중복 확인
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
    // 비밀번호 해쉬화
    password = await bcrypt.hash(password, 10);
    // 사용자 수정
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
  // (FE요청) 삭제
  // //// 프로필 사진 업로드
  // static async uploadUserImage({ email, new_filename }) {
  //   // email 확인
  //   const checkEmail = await User.findByEmail({ email });
  //   const checkEmailString = JSON.stringify(checkEmail);
  //   const checkEmailObject = JSON.parse(checkEmailString);
  //   if (checkEmailObject.length === 0) {
  //     const result_errEmail = {
  //       result: false,
  //       cause: "email",
  //       message:
  //         "입력하신 email로 가입된 사용자가 없습니다. 다시 한 번 확인해 주세요.",
  //     };
  //     return result_errEmail;
  //   }
  //   // db에 파일 경로 갱신
  //   const updateFilename = User.updateFilename({ email, new_filename });
  //   // 파일 삭제
  //   console.log("파일명 확인: ", checkEmailObject[0].profile_image);
  //   const old_filename = checkEmailObject[0].profile_image;
  //   //Directory 존재 여부 체크
  //   if (checkEmailObject[0].profile_image == null) {
  //     // 추후 null을 ./default.jpg로 변경 필요
  //     console.log(
  //       "기존 프로필 사진이 없습니다. 기존 사진 삭제 절차는 생략됩니다."
  //     );
  //   } else {
  //     const directory = fs.existsSync(`./uploads/${old_filename}`); //디렉토리 경로 입력
  //     console.log("삭제할 파일 경로: ", directory);
  //     //Directory가 존재 한다면 true 없다면 false
  //     console.log("Boolan : ", directory);
  //     if (!directory) {
  //       console.log(
  //         `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})이 존재하지 않습니다.`
  //       );
  //     }
  //     fs.rm(`./uploads/${old_filename}`, { recursive: true }, (err) => {
  //       if (err != null) {
  //         console.log(
  //           `[확인요망]: 기존 프로필 사진(파일명: ${old_filename})을 삭제하던 중 오류가 발생했습니다. (에러 메시지: ${err})`
  //         );
  //       }
  //     });
  //   }
  //   const result_success = {
  //     result: true,
  //     cause: "success",
  //     message: `${checkEmailObject[0].nickname}님의 프로필 사진 업데이트가 성공적으로 이뤄졌습니다.`,
  //   };
  //   return result_success;
  // }

  //// 회원정보 삭제
  static async deleteUser({ user_id, password }) {
    // email 확인
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
    // 기존 비밀번호 확인
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
    // 사용자 삭제
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
}
export = userService;
