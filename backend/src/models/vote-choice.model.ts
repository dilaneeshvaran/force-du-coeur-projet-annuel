import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Vote, Choice } from ".";

export class VoteChoice extends Model {
  public voteId!: number;
  public choiceId!: number;
}

VoteChoice.init({
  voteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Vote,
      key: 'voteId'
    }
  },
  choiceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Choice,
      key: 'choiceId'
    }
  },
}, {
  sequelize,
  modelName: 'VoteChoice',
  tableName: 'voteChoices',
  timestamps: false
})
