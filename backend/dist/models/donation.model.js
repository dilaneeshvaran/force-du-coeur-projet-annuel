"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Donation extends sequelize_1.Model {
}
exports.Donation = Donation;
Donation.init({
    donationId: {
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
    donorId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Member,
            key: 'memberId'
        }
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Donation',
    tableName: 'donations',
    timestamps: false
});
_1.Member.hasMany(Donation, { foreignKey: 'donorId' });
