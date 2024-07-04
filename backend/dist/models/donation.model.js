"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Donation = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
const alert_model_1 = require("./alert.model");
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
        allowNull: true,
        references: {
            model: user_model_1.User,
            key: 'id'
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
Donation.belongsTo(user_model_1.User, { foreignKey: 'donatorId' });
Donation.addHook('afterCreate', (donation) => __awaiter(void 0, void 0, void 0, function* () {
    yield alert_model_1.Alert.create({
        label: 'Nouveau Don',
        description: `Un don de ${donation.amount} euros a été fait par ${donation.fullname}, email :  (${donation.email}).`,
        date: new Date()
    });
}));
