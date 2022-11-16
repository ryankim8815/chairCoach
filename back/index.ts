import app from "./src/app";
import "dotenv/config";
require("dotenv").config();

console.log(process.env.SERVER_PORT);
console.log(typeof process.env.SERVER_PORT);
const PORT: string = process.env.SERVER_PORT;

app
  .listen(PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
  })
  .on("error", (err: string) => console.log(err));
