import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";

const app = express();
app.use(cors());
//application/json의 Content-Type에 대해 파싱해주는 역할 - req.body에 접근 가능
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.

app.use(userRouter);

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 4팀 backend 서버입니다.");
});

export = app;
