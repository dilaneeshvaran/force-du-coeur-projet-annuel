"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Choice = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Choice extends sequelize_1.Model {
}
exports.Choice = Choice;
Choice.init({
    choiceId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Choice',
    tableName: 'choices',
    timestamps: false
});
Choice.hasMany(_1.VoteChoice, { foreignKey: 'choiceId' });
