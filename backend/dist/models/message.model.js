"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Message extends sequelize_1.Model {
}
exports.Message = Message;
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subject: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('sent', 'received'),
        allowNull: false,
    },
    fileAttachment: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false
});
//
_1.Member.hasMany(Message, { foreignKey: 'id', as: 'sentMessages' });
//
_1.Member.hasMany(Message, { foreignKey: 'id', as: 'receivedMessages' });
