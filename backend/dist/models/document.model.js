"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Document extends sequelize_1.Model {
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
        this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
    }
}
exports.Document = Document;
Document.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    file: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isArchieved: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    senderId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.User,
            key: 'id'
        }
    },
    receiverId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.User,
            key: 'id'
        }
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: false
});
