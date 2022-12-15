module.exports = function (sequelize, db) {
    var Token = sequelize.define("token", {
        refresh_token: {
            type: db.DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
        },
        access_token: {
            type: db.DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        ip_address: {
            type: db.DataTypes.STRING(12),
            allowNull: false,
        },
        created_at: {
            type: "TIMESTAMP",
            defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        user_id: {
            type: db.DataTypes.UUID,
            unique: true,
            allowNull: false,
            references: {
                model: db.User,
                key: "user_id",
            },
        },
        status: {
            type: db.DataTypes.STRING(16),
            allowNull: true,
        },
    }, {
        sequelize: sequelize,
        modelName: "token",
        timestamps: false,
        // charset: "utf8mb4",
        paranoid: false, // true: soft deletion
    });
    return Token;
};
