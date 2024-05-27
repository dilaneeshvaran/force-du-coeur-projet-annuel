"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
class Vote extends sequelize_1.Model {
}
exports.Vote = Vote;
Vote.init({
    voteId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    votingType: {
        type: sequelize_1.DataTypes.ENUM('one-round', 'two-round'),
        allowNull: false
    },
    votingMethod: {
        type: sequelize_1.DataTypes.ENUM('majority rule', 'absolute majority'),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('open', 'closed'),
        allowNull: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    timestamps: false
});
