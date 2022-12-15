import { db } from "./index";

class Token {
  // Models
  static create = ({ email, code }) =>
    db.sequelize.query(
      `
      REPLACE INTO tokens (email, code) 
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
      SELECT code FROM tokens 
      WHERE email = ?
        `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [email],
      }
    );

  //   static delete = ({ email }) =>
  //     db.sequelize.query(
  //       `
  //       DELETE FROM tokens
  //       WHERE email = ?
  //         `,
  //       {
  //         type: db.QueryTypes.DELETE,
  //         replacements: [email],
  //       }
  //     );
}

export = Token;
