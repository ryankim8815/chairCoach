module.exports = (sequelize, db) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        // type: DataTypes.CHAR(36),   // mysql for UUID
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4, // auto generator
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      password: {
        type: db.DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: db.DataTypes.STRING(255),
        unique: true,
        allowNull: false,
      },
      nickname: {
        type: db.DataTypes.STRING(12), // 한글+숫자 2~8 | 영어+숫자 2~12
        unique: true,
        allowNull: false,
      },
      provider: {
        type: db.DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      withdraw_at: {
        type: "TIMESTAMP",
        allowNull: true,
      },
      status: {
        type: db.DataTypes.STRING(16),
        allowNull: true,
      },
      alert: {
        type: db.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      timer: {
        type: db.DataTypes.INTEGER,
        defaultValue: "0",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
      timestamps: false, // true: createAt, updateAt
      // charset: "utf8mb4",
      paranoid: true, // soft deletion
      // Using `unique: true` in an attribute above is exactly the same as creating the index in the model's options:
      // indexes: [{ unique: true, fields: ["someUnique"] }], // field를 정의하면 getter setter 활용가능
    }
  );

  return User;
};
