import { db } from "./index";

class Code {
  // Models
  static create = ({ email, code }) =>
    db.sequelize.query(
      `
      REPLACE INTO codes (email, code) 
      VALUES (?, ?)
        `,
      {
        type: db.QueryTypes.REPLACE,
        replacements: [email, code],
      }
    );

  static findByEmail = ({ email }) =>
    db.sequelize.query(
      `
      SELECT code FROM codes 
      WHERE email = ?
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email],
      }
    );

  static delete = ({ email }) =>
    db.sequelize.query(
      `
      DELETE FROM codes
      WHERE email = ?
        `,
      {
        type: db.QueryTypes.DELETE,
        replacements: [email],
      }
    );
}

export = Code;
