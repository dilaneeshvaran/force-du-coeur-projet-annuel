import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';

export class Alert extends Model {
  public id!: number; 
  public label!: string;
  public description?: string;
  public date!: Date;
  public isArchived!: boolean;
}

Alert.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize, 
  modelName: 'Alert', 
  tableName: 'alerts', 
  timestamps: false
});