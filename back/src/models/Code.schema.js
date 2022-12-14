module.exports = function (sequelize, db) {
    var Code = sequelize.define("code", {
        email: {
            type: db.DataTypes.STRING(255),
            unique: true,
            primaryKey: true,
            allowNull: false,
            // references: {
            //   model: db.User,
            //   key: "email",
            // },
        },
        code: {
            type: db.DataTypes.STRING(12),
            allowNull: false,
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
    }, {
        sequelize: sequelize,
        modelName: "code",
        timestamps: false,
        // charset: "utf8mb4",
        paranoid: false, // true: soft deletion
    });
    return Code;
};
