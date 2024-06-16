"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
class Task extends sequelize_1.Model {
}
exports.Task = Task;
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    deadline: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    assigned_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('ongoing', 'completed', 'failed'),
        allowNull: false
    },
    assignedTo: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    completedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    failedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
});
Task.belongsTo(user_model_1.User, { foreignKey: 'assignedTo' });
