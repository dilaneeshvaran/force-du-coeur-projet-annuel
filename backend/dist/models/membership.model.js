"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Membership = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Membership extends sequelize_1.Model {
}
exports.Membership = Membership;
Membership.init({
    membershipId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    amount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    paymentDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    memberId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.Member,
            key: 'memberId'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'paid'),
        allowNull: false
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Membership',
    tableName: 'memberships',
    timestamps: false
});
_1.Member.hasMany(Membership, { foreignKey: 'memberId' });
