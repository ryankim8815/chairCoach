declare namespace Express {
  interface Request {
    email?: string;
    filename?: string;
    // files?: any; // something like `multer.Files`
  }
}
