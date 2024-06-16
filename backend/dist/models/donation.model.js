"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
class Donation extends sequelize_1.Model {
}
exports.Donation = Donation;
Donation.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    donationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    donationFrequency: {
        type: sequelize_1.DataTypes.ENUM('monthly', 'yearly', 'punctual'),
        allowNull: false
    },
    donatorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.User,
            key: 'userId'
        }
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    timestamps: false
});
user_model_1.User.hasMany(Donation, { foreignKey: 'donatorId' });
