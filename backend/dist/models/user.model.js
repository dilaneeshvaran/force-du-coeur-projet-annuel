"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateUser = exports.generateValidationCode = exports.User = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const crypto_1 = __importDefault(require("crypto"));
const _1 = require(".");
class User extends sequelize_1.Model {
    static associate(models) {
        this.hasMany(models.Document, { foreignKey: 'senderId', as: 'sentDocuments' });
        this.hasMany(models.Document, { foreignKey: 'receiverId', as: 'receivedDocuments' });
    }
}
exports.User = User;
const generateValidationCode = () => {
    return crypto_1.default.randomBytes(8).toString('hex');
};
exports.generateValidationCode = generateValidationCode;
function associateUser() {
    User.hasMany(_1.Document, { foreignKey: 'senderId' });
    User.hasMany(_1.Document, { foreignKey: 'receiverId' });
}
exports.associateUser = associateUser;
User.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('username', value.toLowerCase());
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('email', value.toLowerCase());
        }
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    verificationCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: exports.generateValidationCode
    },
    passwordResetCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
});
