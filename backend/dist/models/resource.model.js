"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resource = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
class Resource extends sequelize_1.Model {
}
exports.Resource = Resource;
Resource.init({
    resourceId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    label: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Resource',
    tableName: 'resources',
    timestamps: false
});
