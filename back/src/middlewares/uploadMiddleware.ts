import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const originalname = file.originalname.split(".");
    const ext = originalname[originalname.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    req.body = JSON.parse(JSON.stringify(req.body)); // [Object: null prototype] 방지
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({ storage: storage });

export = upload;
