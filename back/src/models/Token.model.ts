import { db } from "./index";

class Token {
  // Models
  static create = ({
    user_id,
    refreshToken,
    accessToken,
    ipAddress,
    transaction,
  }) =>
    db.sequelize.query(
      `
      INSERT INTO tokens (user_id, refresh_token, access_token, ip_address, status) 
      VALUES (?, ?, ?, ?, ?)
        `,
      {
        type: db.QueryTypes.INSERT,
        replacements: [user_id, refreshToken, accessToken, ipAddress, "valid"],
        transaction: transaction,
      }
    );

  static update = ({
    user_id,
    refreshToken,
    accessToken,
    ipAddress,
    status,
    created_at,
  }) =>
    db.sequelize.query(
      `
      UPDATE tokens
      SET   refresh_token = ?,
            access_token = ?,
            ip_address = ?,
            status = ?,
            created_at = ? 
      WHERE user_id = ? 
        `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [
          refreshToken,
          accessToken,
          ipAddress,
          status,
          created_at,
          user_id,
        ],
      }
    );
  static reissue = ({
    currentRefreshToken,
    refreshToken,
    accessToken,
    ipAddress,
    status,
    created_at,
  }) =>
    db.sequelize.query(
      `
      UPDATE tokens
      SET   refresh_token = ?,
            access_token = ?,
            ip_address = ?,
            status = ?,
            created_at = ? 
      WHERE refresh_token = ? 
        `,
      {
        type: db.QueryTypes.UPDATE,
        replacements: [
          refreshToken,
          accessToken,
          ipAddress,
          status,
          created_at,
          currentRefreshToken,
        ],
      }
    );

  static findByRefreshToken = ({ currentRefreshToken }) =>
    db.sequelize.query(
      `
        SELECT * FROM tokens
        WHERE refresh_token = ?
          `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [currentRefreshToken],
      }
    );
  static findByAccessToken = ({ userToken }) =>
    db.sequelize.query(
      `
        SELECT * FROM tokens
        WHERE access_token = ?
          `,
      {
        type: db.QueryTypes.SELECT,
        replacements: [userToken],
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
