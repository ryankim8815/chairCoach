module.exports = function (sequelize, db) {
    var Neck = sequelize.define("neck", {
        neck_id: {
            type: db.DataTypes.UUID,
            defaultValue: db.DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        user_id: {
            type: db.DataTypes.UUID,
            // defaultValue: db.DataTypes.UUIDV4, // auto generator
            // unique: true,
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
            type: db.DataTypes.FLOAT,
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
    }, {
        sequelize: sequelize,
        modelName: "neck",
        timestamps: false,
        paranoid: true, // soft deletion
    });
    return Neck;
};
