"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberResource = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model"); // Adjust the path as necessary
const resource_model_1 = require("./resource.model");
class MemberResource extends sequelize_1.Model {
}
exports.MemberResource = MemberResource;
MemberResource.init({
    memberId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    resourceId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'MemberResource',
    tableName: 'memberResources',
    timestamps: false
});
MemberResource.belongsTo(user_model_1.User, { foreignKey: 'memberId' });
MemberResource.belongsTo(resource_model_1.Resource, { foreignKey: 'resourceId' });
