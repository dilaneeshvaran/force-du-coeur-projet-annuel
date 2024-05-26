"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteChoice = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class VoteChoice extends sequelize_1.Model {
}
exports.VoteChoice = VoteChoice;
VoteChoice.init({
    voteId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: _1.Vote,
            key: 'voteId'
        }
    },
    choiceId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: _1.Choice,
            key: 'choiceId'
        }
    },
}, {
    sequelize: services_1.sequelize,
    modelName: 'VoteChoice',
    tableName: 'voteChoices',
    timestamps: false
});
