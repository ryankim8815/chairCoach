import express from "express";
import cors from "cors";
import userRouter from "./routers/userRouter";
import socialLoginRouter from "./routers/socialLoginRouter";
import neckRouter from "./routers/neckRouter";
import bodyRouter from "./routers/bodyRouter";
import swagger from "./utils/swagger";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(socialLoginRouter);
app.use(neckRouter);
app.use(bodyRouter);
app.use(swagger);

app.get("/", (req, res) => {
  res.send("안녕하세요, 4팀 backend 서버입니다.");
});

export = app;
