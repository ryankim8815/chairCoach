import requestIp from "request-ip";
import * as express from "express";
import moment from "moment-timezone";
moment.tz.setDefault("Asia/Seoul");

const checkClientIp = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const requestClientIp = requestIp.getClientIp(req);
    const requestStartTime = moment().format("YYYY-MM-DD HH:mm:ss");
    req.body.requestClientIp = requestClientIp;
    req.body.requestStartTime = requestStartTime;
    next();
  } catch (e) {
    next(e);
  }
};

export = checkClientIp;
