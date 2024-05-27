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
    messageId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Member,
            key: 'memberId'
        }
    },
    recipientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Member,
            key: 'memberId'
        }
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: false
});
//
_1.Member.hasMany(Message, { foreignKey: 'authorId', as: 'sentMessages' });
//
_1.Member.hasMany(Message, { foreignKey: 'recipientId', as: 'receivedMessages' });
