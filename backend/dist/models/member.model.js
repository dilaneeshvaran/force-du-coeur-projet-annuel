"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
class Member extends sequelize_1.Model {
}
exports.Member = Member;
Member.init({
    memberId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.User,
            key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.ENUM('admin', 'member'),
        allowNull: false,
        defaultValue: 'member'
    },
    memberSince: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    dateOfBirth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Member',
    tableName: 'members',
    timestamps: false
});
user_model_1.User.hasOne(Member, { foreignKey: 'userId' });
Member.belongsTo(user_model_1.User, { foreignKey: 'userId' });
