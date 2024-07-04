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
exports.Membership = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
const alert_model_1 = require("./alert.model");
class Membership extends sequelize_1.Model {
}
exports.Membership = Membership;
Membership.init({
    id: {
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
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('active', 'inactive'),
        allowNull: false
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'Membership',
    tableName: 'memberships',
    timestamps: false
});
user_model_1.User.hasMany(Membership, { foreignKey: 'userId' });
Membership.belongsTo(user_model_1.User, { foreignKey: 'userId' });
Membership.addHook('afterCreate', (membership) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(membership.userId);
    if (user) {
        yield alert_model_1.Alert.create({
            label: 'Nouveau Membre',
            description: `${user.firstname} ${user.lastname} (${user.email}) vient d'adhérer, avec un montant de ${membership.amount}.`,
            date: new Date()
        });
    }
}));
