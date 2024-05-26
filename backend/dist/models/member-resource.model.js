"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberResource = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
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
MemberResource.belongsTo(_1.Member, { foreignKey: 'memberId' });
MemberResource.belongsTo(_1.Resource, { foreignKey: 'resourceId' });
