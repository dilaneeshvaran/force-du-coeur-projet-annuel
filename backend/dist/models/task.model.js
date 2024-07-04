"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
const alert_model_1 = require("./alert.model");
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
Task.addHook('afterUpdate', (task) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(task.assignedTo);
    if (user) {
        if (task.status === 'failed') {
            yield alert_model_1.Alert.create({
                label: 'Tache échouée',
                description: `La tache "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) est échoué.`,
                date: new Date()
            });
        }
        else if (task.status === 'completed') {
            yield alert_model_1.Alert.create({
                label: 'Tache complétée',
                description: `La tache "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) est complété.`,
                date: new Date()
            });
        }
        else if (task.status === 'ongoing' && new Date() > task.deadline) {
            yield alert_model_1.Alert.create({
                label: 'Deadline passé pour une tâche',
                description: `La tache :  "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) a dépassé le deadline.`,
                date: new Date()
            });
        }
    }
}));
