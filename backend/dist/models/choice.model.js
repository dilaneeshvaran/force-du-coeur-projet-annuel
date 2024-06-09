"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
class Option extends sequelize_1.Model {
}
exports.Option = Option;
Option.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    label: sequelize_1.DataTypes.STRING,
    voteId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    votes: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
}, {
    tableName: 'options',
    sequelize: services_1.sequelize,
});
