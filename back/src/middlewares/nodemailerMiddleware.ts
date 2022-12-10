import nodemailer from "nodemailer";
import * as express from "express";
// import User from "../db/models/User";
import User from "../models/User.model";
import * as ClientError from "../responses/clientErrorResponse";

const sendEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const email = req.body.email;
    // 이메일 중복 확인
    const checkEmail = await User.findByEmail({ email });
    // const checkEmailString = JSON.stringify(checkEmail);
    // const checkEmailObject = JSON.parse(checkEmailString);
    if (checkEmail.length !== 0) {
      throw ClientError.unauthorized(
        "요청하신 정보로 이미 가입된 내역이 있습니다."
      );
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
  } catch (e) {
    next(e);
  }
};

export = sendEmail;
