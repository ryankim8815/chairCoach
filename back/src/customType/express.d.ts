declare namespace Express {
  interface Request {
    user_id?: string;
    filename?: string;
    // files?: any; // something like `multer.Files`
  }
}
