import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../services';

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

