module.exports = function (sequelize, db) {
    var Body = sequelize.define("body", {
        body_id: {
            type: db.DataTypes.UUID,
            defaultValue: db.DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: db.DataTypes.UUID,
            defaultValue: db.DataTypes.UUIDV4,
            unique: true,
            //   primaryKey: true,
            allowNull: false,
            references: {
                model: db.User,
                key: "user_id",
            },
        },
        tag: {
            type: db.DataTypes.STRING(16),
            allowNull: false,
        },
        start_time: {
            type: "TIMESTAMP",
            defaultValue: db.Sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        },
        end_time: {
            type: "TIMESTAMP",
            allowNull: true,
        },
        duration: {
            type: db.DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        sequelize: sequelize,
        modelName: "body",
        timestamps: false,
        // charset: "utf8mb4", // tag
        paranoid: true, // soft deletion
    });
    return Body;
};
