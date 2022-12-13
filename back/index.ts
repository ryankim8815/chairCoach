// // //////////
// import app from "./src/app";
// import "dotenv/config";
// import fs from "fs";
// import HTTPS from "https";

// require("dotenv").config();
// const PORT: string = process.env.SERVER_PORT;
// const myUrl = "kdt-ai5-team04.elicecoding.com";
// // const app = express();
// console.log(
//   "==========================URL",
//   `/etc/letsencrypt/live/${myUrl}/fullchain.pem`
// );
// console.log("BEFORE OPTION");
// const option = {
//   ca: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/fullchain.pem`),
//   key: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/privkey.pem`),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/cert.pem`),
// };

// console.log("BEFORE HTTPS.create....");
// HTTPS.createServer(option, app)
//   .listen(PORT, () => {
//     console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + PORT);
//   })
//   .on("error", (err: string) => console.log(err));
// // //////////

import app from "./src/app";
import "dotenv/config";
require("dotenv").config();

const PORT: string = process.env.SERVER_PORT;

app
  .listen(PORT, () => {
    console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
  })
  .on("error", (err: string) => console.log(err));
