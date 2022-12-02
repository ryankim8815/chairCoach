import * as express from "express";
import userService from "../services/userService";
// import logger from "../../config/logger";
const logger = require("../../config/logger");

class userController {
  // GET: 사용자 리스트 조회 기능
  static async userList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const allUsers = await userService.getAllUsers();
      logger.info(allUsers);
      return res.status(200).json(allUsers);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userList api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // GET: 현재 사용자 정보 조회 기능
  static async userCurrent(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const currentUser = await userService.getCurrentUser({ user_id });
      logger.error(currentUser); // test
      return res.status(200).json(currentUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userCurrent api에서 오류가 발생했습니다.",
      };
      logger.error(result_err); // test
      return res.status(200).json(result_err);
    }
  }

  // POST: 회원가입 기능
  static async userRegister(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const nickname = req.body.nickname;
      const newUser = await userService.addUser({ email, password, nickname });
      return res.status(200).json(newUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userRegister api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // POST: 로그인
  static async userSignin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const signinUser = await userService.getUser({ email, password });
      return res.status(200).json(signinUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userLogin api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // POST: 회원정보 수정을 위한 비밀번호 확인
  static async userPassword(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const password = req.body.password;
      const updateUser = await userService.passwordCheck({
        user_id,
        password,
      });
      return res.status(200).json(updateUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userPassword api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // POST: 회원정보 수정
  static async userUpdate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const currentPassword = req.body.currentPassword;
      const password = req.body.password;
      const nickname = req.body.nickname;
      const updateUser = await userService.updateUser({
        user_id,
        currentPassword,
        password,
        nickname,
      });
      return res.status(200).json(updateUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userUpdate api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  // DELETE: 회원정보 삭제
  static async userDelete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const password = req.body.password;
      const deleteUser = await userService.deleteUser({
        user_id,
        password,
      });
      return res.status(200).json(deleteUser);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userDelete api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  /// POST: email 인증을 위한 코드 발송
  static async signupEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.body.email;
      const code = req.body.code;
      const sendCodeToEmail = await userService.sendCode({
        // redis 활용 고려
        email,
        code,
      });
      return res.status(200).json(sendCodeToEmail);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupEmail api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  /// GET: email 인증 코드 확인
  static async signupVerifyEmail(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const email = req.params.email;
      const code = req.params.code;
      const verifyEmailCode = await userService.verifyCode({
        email,
        code,
      });
      return res.status(200).json(verifyEmailCode);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupVerifyEmail api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  /// GET: nickname 중복확인
  static async signupNickname(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const nickname = req.params.nickname;
      const checkNickname = await userService.nicknameDuplicateCheck({
        nickname,
      });
      return res.status(200).json(checkNickname);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "signupNickname api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }

  /// PATCH: 알람 설정
  static async userSetAlert(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      const alert = req.body.alert;
      const timer = req.body.timer;
      const setAlert = await userService.setAlert({
        user_id,
        alert,
        timer,
      });
      return res.status(200).json(setAlert);
    } catch (err) {
      const result_err = {
        result: false,
        cause: "api",
        message: "userSetAlert api에서 오류가 발생했습니다.",
      };
      return res.status(200).json(result_err);
    }
  }
}

export = userController;
