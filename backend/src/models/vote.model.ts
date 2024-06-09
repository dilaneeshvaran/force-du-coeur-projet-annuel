import { Model, DataTypes } from 'sequelize';
import { sequelize } from './../services';

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
  createdBy: DataTypes.INTEGER.UNSIGNED, // New field
  voterId: DataTypes.INTEGER.UNSIGNED, // New field
}, {
  tableName: 'votes',
  sequelize,
});

export class UserVote extends Model {
  public userId!: number;
  public optionId!: number;
}

UserVote.init({
  userId: {
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
});

Vote.hasMany(Option, { foreignKey: 'voteId' });
Option.belongsTo(Vote, { foreignKey: 'voteId' });

Option.hasMany(UserVote, { foreignKey: 'optionId' });
UserVote.belongsTo(Option, { foreignKey: 'optionId' });