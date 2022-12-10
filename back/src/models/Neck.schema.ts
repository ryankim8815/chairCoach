module.exports = (sequelize, db) => {
  const Neck = sequelize.define(
    "neck",
    {
      neck_id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4, // auto generator
        unique: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: db.DataTypes.UUID,
        defaultValue: db.DataTypes.UUIDV4, // auto generator
        unique: true,
        //   primaryKey: true,
        allowNull: false,
        references: {
          model: db.User,
          key: "user_id",
        },
      },
      filename: {
        type: db.DataTypes.STRING(255),
        allowNull: false,
      },
      result: {
        type: db.DataTypes.FLOAT, // 각도는 최대 360도 - 적절한지 확인 필요
        allowNull: false,
      },
      score: {
        type: db.DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "neck",
      timestamps: false, // true: createAt, updateAt
      paranoid: true, // soft deletion
    }
  );
  return Neck;
};
