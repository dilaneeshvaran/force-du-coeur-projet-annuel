import { Model, DataTypes } from 'sequelize';
import { sequelize } from './../services';
import { User } from './user.model';

export class Option extends Model {
  public id!: number;
  public label!: string;
  public voteId!: number;
  public votes!: number;
}

Option.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  label: DataTypes.STRING,
  voteId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  votes: {
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 0,
  },
}, { 
  tableName: 'options',
  sequelize,
  timestamps: false,
});


export class Vote extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public votingType!: 'one-round' | 'two-round';
  public ongoingRound!: 'first-round' | 'second-round'; 
  public votingMethod!: 'majority rule' | 'absolute majority';
  public status!: 'open' | 'closed';
  public options!: Option[];
  public createdBy!: number;
  public voterId!: number;
}

Vote.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  votingType: DataTypes.ENUM('one-round', 'two-round'),
  ongoingRound: DataTypes.ENUM('first-round', 'second-round'),
  votingMethod: DataTypes.ENUM('majority rule', 'absolute majority'),
  status: DataTypes.ENUM('open', 'closed'),
  createdBy: DataTypes.INTEGER.UNSIGNED,
  voterId: DataTypes.INTEGER.UNSIGNED,
}, {
  tableName: 'votes',
  sequelize,
  timestamps: false,  
});

export class UserVote extends Model {
  public id!: number;
  public userId!: number;
  public voteId!: number;
  public optionId!: number;
}

UserVote.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  voteId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  optionId: { 
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
}, {
  tableName: 'user_votes',
  sequelize,
  timestamps: false,
});

Option.findAll({
  attributes: [
    'label',
    [sequelize.fn('COUNT', sequelize.col('UserVotes.voteId')), 'voteCount']
  ],
  include: [{
    model: UserVote,
    attributes: []
  }],
  group: ['Option.id'],
  order: [[sequelize.literal('voteCount'), 'DESC']]
});
Vote.hasMany(Option, { foreignKey: 'voteId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Option.belongsTo(Vote, { foreignKey: 'voteId' });

Vote.belongsTo(User, { as: 'Voter', foreignKey: 'voterId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
User.hasMany(Vote, { as: 'VotedVotes', foreignKey: 'voterId' });

Vote.belongsTo(User, { as: 'Creator', foreignKey: 'createdBy', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
User.hasMany(Vote, { as: 'CreatedVotes', foreignKey: 'createdBy' });

Option.hasMany(UserVote, { foreignKey: 'optionId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserVote.belongsTo(Option, { foreignKey: 'optionId' });