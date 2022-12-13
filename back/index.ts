// //////////
import app from "./src/app";
import "dotenv/config";
import fs from "fs";
import http from "http";
import https from "https";

require("dotenv").config();
const PORT: string = process.env.SERVER_PORT;
const HTTPS_PORT: string = process.env.HTTPS_SERVER_PORT;
const myUrl = "kdt-ai5-team04.elicecoding.com";
// const app = express();

const privateKey = fs.readFileSync(
  `/etc/letsencrypt/live/${myUrl}/privkey.pem`,
  "utf8"
);
const certificate = fs.readFileSync(
  `/etc/letsencrypt/live/${myUrl}/cert.pem`,
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT);
httpsServer.listen(HTTPS_PORT);

// const option = {
//   ca: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/fullchain.pem`),
//   key: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/privkey.pem`),
//   cert: fs.readFileSync(`/etc/letsencrypt/live/${myUrl}/cert.pem`),
// };
// // HTTP
// HTTP.createServer(PORT)
//   .listen(PORT, () => {
//     console.log("HTTP 서버가 실행되었습니다. 포트 :: " + PORT);
//   })
//   .on("error", (err: string) => console.log(err));

//   //HTTPS
// HTTPS.createServer(option, app)
//   .listen(HTTPS_PORT, () => {
//     console.log("HTTPS 서버가 실행되었습니다. 포트 :: " + HTTPS_PORT);
//   })
//   .on("error", (err: string) => console.log(err));
// //////////

// ///// 기존 http /////
// import app from "./src/app";
// import "dotenv/config";
// require("dotenv").config();

// const PORT: string = process.env.SERVER_PORT;

// app
//   .listen(PORT, () => {
//     console.log(`정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
//   })
//   .on("error", (err: string) => console.log(err));
