"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vote = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const _1 = require(".");
class Vote extends sequelize_1.Model {
}
exports.Vote = Vote;
Vote.init({
    voteId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    startDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    votingType: {
        type: sequelize_1.DataTypes.ENUM('one-round', 'two-round'),
        allowNull: false
    },
    ongoingRound: {
        type: sequelize_1.DataTypes.ENUM('first-round', 'second-round'),
        allowNull: false
    },
    votingMethod: {
        type: sequelize_1.DataTypes.ENUM('majority rule', 'absolute majority'),
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('open', 'closed'),
        allowNull: false
    },
    options: {
        type: sequelize_1.DataTypes.JSON,
        validate: {
            isArrayOfOptions(value) {
                if (!Array.isArray(value)) {
                    throw new Error('il faut un tableau');
                }
                if (value.length > 10) {
                    throw new Error('le tableau d\'options contient au maximum 10 éléments');
                }
                value.forEach((option) => {
                    if (typeof option.label !== 'string' || typeof option.votes !== 'number') {
                        throw new Error('chaque option requiert un label et un nombre de votes');
                    }
                });
            }
        }
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.User,
            key: 'userId'
        }
    },
    voterId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: _1.User, // Updated to User
            key: 'userId' // Updated to userId
        }
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Vote',
    tableName: 'votes',
    timestamps: false
});
