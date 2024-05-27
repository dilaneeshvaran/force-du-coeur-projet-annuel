import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { VoteChoice } from ".";

export class Vote extends Model {
  public voteId!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public votingType!: 'one-round' | 'two-round';
  public votingMethod!: 'majority rule' | 'absolute majority';
  public status!: 'open' | 'closed';
}

Vote.init({
  voteId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  votingType: {
    type: DataTypes.ENUM('one-round', 'two-round'),
    allowNull: false
  },
  votingMethod: {
    type: DataTypes.ENUM('majority rule', 'absolute majority'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Vote',
  tableName: 'votes',
  timestamps: false
});

