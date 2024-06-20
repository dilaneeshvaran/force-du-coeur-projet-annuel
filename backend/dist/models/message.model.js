"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('sent', 'received'),
        allowNull: true,
    },
    fileAttachment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    senderMail: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    receiverMail: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    replyAdminId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }, replied: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false
});
user_model_1.User.hasMany(Message, { foreignKey: 'senderMail', as: 'sentMessages' });
user_model_1.User.hasMany(Message, { foreignKey: 'receiverMail', as: 'receivedMessages' });
