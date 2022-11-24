import multer from "multer";
import * as express from "express";

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
      // An unknown error occurred when uploading. - from middleware
      const result_err = {
        result: false,
        cause: "file",
        message:
          "파일 업로드 중 오류가 발생했습니다. 파일 제한 조건을 확인해주세요.",
      };
      console.log(result_err);
      return res.status(200).json(result_err);
    }
    // Everything went fine.
    next();
  });
};

export = uploadMiddleware;
