import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Vote } from ".";
import { Choice } from ".";

export class VoteChoice extends Model {
  public voteId!: number;
  public choiceId!: number;
}

VoteChoice.init({
  voteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  choiceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'VoteChoice',
  tableName: 'votesChoices',
  timestamps: false,
})

VoteChoice.belongsTo(Vote, { foreignKey: 'voteId' });
VoteChoice.belongsTo(Choice, { foreignKey: 'choiceId' });