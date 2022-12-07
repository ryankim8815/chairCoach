import * as express from "express";
import userService from "../services/userService";
import * as ClientError from "../responses/clientErrorResponse";
const logger = require("../../config/logger");

class userController {
  // GET: 사용자 리스트 조회 기능
  static async userList(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { count, list } = await userService.getAllUsers();
      const result = {
        result: true,
        count,
        list,
      };
      logger.info(result);
      return res.status(200).json(result);
    } catch (e) {
      next(e);
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
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const currentUser = await userService.getCurrentUser({ user_id });
      logger.error(currentUser); // test
      return res.status(200).json(currentUser);
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
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
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const password = req.body.password;
      const updateUser = await userService.passwordCheck({
        user_id,
        password,
      });
      return res.status(200).json(updateUser);
    } catch (e) {
      next(e);
    }
  }

  // PUT: 회원정보 수정
  static async userUpdate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const user_id = req.body.user_id;
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
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
    } catch (e) {
      next(e);
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
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const password = req.body.password;
      const deleteUser = await userService.deleteUser({
        user_id,
        password,
      });
      return res.status(200).json(deleteUser);
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
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
    } catch (e) {
      next(e);
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
      if (user_id !== req.params.user_id) {
        throw ClientError.unauthorized(
          "정상적으로 로그인된 사용자의 요청이 아닙니다."
        );
      }
      const alert = req.body.alert;
      const timer = req.body.timer;
      const setAlert = await userService.setAlert({
        user_id,
        alert,
        timer,
      });
      return res.status(200).json(setAlert);
    } catch (e) {
      next(e);
    }
  }
}

export = userController;
