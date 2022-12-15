import requestIp from "request-ip";
import * as express from "express";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

// module.exports = async (
const checkClientIp = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const requestClientIp = requestIp.getClientIp(req);
    // const requestStartTime = Date.now();
    const requestStartTime = moment().format("YYYY-MM-DD HH:mm:ss");
    req.body.requestClientIp = requestClientIp;
    req.body.requestStartTime = requestStartTime;
    next();
  } catch (e) {
    next(e);
  }
};

export = checkClientIp;
