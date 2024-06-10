import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';

export class Participation extends Model {
  public userId!: number;
  public eventId!: number;
}

Participation.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Participation',
  tableName: 'participations',
  timestamps: false, 
});