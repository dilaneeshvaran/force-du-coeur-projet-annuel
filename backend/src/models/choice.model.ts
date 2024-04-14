import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { VoteChoice } from ".";

export class Choice extends Model {
  public choiceId!: number;
  public label!: string;
}

Choice.init({
  choiceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  sequelize,
  modelName: 'Choice',
  tableName: 'choices',
  timestamps: false
});

Choice.hasMany(VoteChoice, { foreignKey: 'choiceId' });