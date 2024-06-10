"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVote = exports.Vote = exports.Option = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
const user_model_1 = require("./user.model");
class Option extends sequelize_1.Model {
}
exports.Option = Option;
Option.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    label: sequelize_1.DataTypes.STRING,
    voteId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    votes: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
    },
}, {
    tableName: 'options',
    sequelize: services_1.sequelize,
    timestamps: false, // Added this line
});
class Vote extends sequelize_1.Model {
}
exports.Vote = Vote;
Vote.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: sequelize_1.DataTypes.STRING,
    description: sequelize_1.DataTypes.TEXT,
    startDate: sequelize_1.DataTypes.DATE,
    endDate: sequelize_1.DataTypes.DATE,
    votingType: sequelize_1.DataTypes.ENUM('one-round', 'two-round'),
    ongoingRound: sequelize_1.DataTypes.ENUM('first-round', 'second-round'),
    votingMethod: sequelize_1.DataTypes.ENUM('majority rule', 'absolute majority'),
    status: sequelize_1.DataTypes.ENUM('open', 'closed'),
    createdBy: sequelize_1.DataTypes.INTEGER.UNSIGNED,
    voterId: sequelize_1.DataTypes.INTEGER.UNSIGNED,
}, {
    tableName: 'votes',
    sequelize: services_1.sequelize,
    timestamps: false,
});
class UserVote extends sequelize_1.Model {
}
exports.UserVote = UserVote;
UserVote.init({ id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    optionId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
}, {
    tableName: 'user_votes',
    sequelize: services_1.sequelize,
    timestamps: false,
});
Option.findAll({
    attributes: [
        'label',
        [services_1.sequelize.fn('COUNT', services_1.sequelize.col('UserVotes.optionId')), 'voteCount']
    ],
    include: [{
            model: UserVote,
            attributes: []
        }],
    group: ['Option.id'],
    order: [[services_1.sequelize.literal('voteCount'), 'DESC']]
});
Vote.hasMany(Option, { foreignKey: 'voteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Option.belongsTo(Vote, { foreignKey: 'voteId' });
Option.hasMany(UserVote, { foreignKey: 'optionId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserVote.belongsTo(Option, { foreignKey: 'optionId' });
Vote.belongsTo(user_model_1.User, { as: 'Voter', foreignKey: 'voterId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
user_model_1.User.hasMany(Vote, { as: 'VotedVotes', foreignKey: 'voterId' });
Vote.belongsTo(user_model_1.User, { as: 'Creator', foreignKey: 'createdBy', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
user_model_1.User.hasMany(Vote, { as: 'CreatedVotes', foreignKey: 'createdBy' });
