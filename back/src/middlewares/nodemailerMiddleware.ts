import nodemailer from "nodemailer";
import * as express from "express";
import User from "../db/models/User";

const sendEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const email = req.body.email;
    // 이메일 중복 확인
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
      return res.status(200).json(result_errEmail);
    }
    // 코드 발급
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    req.body.code = code;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.APP_PASSWORD,
      },
    });
    let info = await transporter.sendMail({
      from: '"Chair Coach" <dogfoot.info@gmail.com>',
      to: email,
      subject: "ChairCoach에서 메일 확인을 위해 보내드립니다. ✔",
      html: `<b>Hello world?</b>
            <h1>${code}</h1> 
            <h3>위의 번호를 입력해주세요.</h3>
      `,
    });
    next();
  } catch (err) {
    const result_err = {
      result: false,
      cause: "mail",
      message: "mail 발송에 실패했습니다.",
    };
    return res.status(499).json(result_err);
  }
};

export = sendEmail;
