"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    taskId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        //unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        //unique: true
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'in progress', 'completed'),
        allowNull: false
    },
    responsibleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
});
Task.belongsTo(_1.Member, { foreignKey: 'responsibleId' });
