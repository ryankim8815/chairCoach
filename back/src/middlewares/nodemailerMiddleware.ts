import nodemailer from "nodemailer";
import * as express from "express";

const sendEmail = async function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("email checking: ", req.body.email);
  try {
    const email = req.body.email;
    // const code = req.body.code || 3333;
    const code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    req.body.code = code;

    let transporter = nodemailer.createTransport({
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
    console.log(result_err);
    return res.status(499).json(result_err);
  }
};

export = sendEmail;
