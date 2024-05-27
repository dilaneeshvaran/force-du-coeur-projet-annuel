import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { MemberResource } from ".";

export class Resource extends Model {
  public resourceId!: number;
  public label!: string;
  public type!: string;
  public description!: string;
}

Resource.init({
  resourceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Resource',
  tableName: 'resources',
  timestamps: false
});
