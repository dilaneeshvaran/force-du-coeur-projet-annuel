"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Document extends sequelize_1.Model {
}
exports.Document = Document;
Document.init({
    documentId: {
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
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    authorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Member,
            key: 'memberId'
        }
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Document',
    tableName: 'documents',
    timestamps: false
});
_1.Member.hasMany(Document, { foreignKey: 'authorId' });
