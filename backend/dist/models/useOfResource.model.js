"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseOfResource = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("../services");
const _1 = require(".");
class UseOfResource extends sequelize_1.Model {
}
exports.UseOfResource = UseOfResource;
UseOfResource.init({
    useOfResourceId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    resourceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Resource,
            key: 'resourceId'
        }
    },
    taskId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Task,
            key: 'taskId'
        }
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'UseOfResource',
    tableName: 'useOfResources',
    timestamps: false
});
