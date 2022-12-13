import multer from "multer";
import * as express from "express";
import { multerError } from "../responses/errorResponse";

const fileFilter = (
  req: express.Request,
  file: Express.Multer.File,
  cb: any
) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only .png, .gif, .jpg and .jpeg format allowed!"));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname.split(".");
    const ext = originalname[originalname.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.body = JSON.parse(JSON.stringify(req.body));
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1000 * 5, // 5mb 이하
  },
  fileFilter: fileFilter,
});
const uploadFile = upload.single("file");

const uploadMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  uploadFile(req, res, function (err: any) {
    if (err) {
      // next(multerError);
      next(err);
    }
    next();
  });
};

export = uploadMiddleware;
