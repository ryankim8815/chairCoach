declare namespace Express {
  interface Request {
    // email?: string;   // user_id로 변경
    user_id?: string;
    filename?: string;
    // files?: any; // something like `multer.Files`
  }
}
