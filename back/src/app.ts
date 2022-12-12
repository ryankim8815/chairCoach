import express from "express";
import cors from "cors";
// import sequelize from "./config/sequelize";
import { db } from "./models";
import userRouter from "./routers/userRouter";
import socialLoginRouter from "./routers/socialLoginRouter";
import neckRouter from "./routers/neckRouter";
import bodyRouter from "./routers/bodyRouter";
import swagger from "./utils/swagger";
import { errorHandler } from "./middlewares/errorMiddleware";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(socialLoginRouter);
app.use(neckRouter);
app.use(bodyRouter);
app.use(swagger);

// errorHandlers
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("안녕하세요, 4팀 backend 서버입니다.");
});

// sequelize.sync({ force: false, alter: true });
// db.sequelize.sync({ force: true });
db.sequelize.sync({ alter: true });
// db.sequelize.sync({ alter: { drop: false } });

(async () => {
  try {
    await db.sequelize.authenticate();
    console.log("데이터베이스 연결 성공");
  } catch (error) {
    console.error("데이터베이스 오류:", error);
  }
})();

export = app;
