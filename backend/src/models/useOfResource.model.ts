import { DataTypes, Model } from "sequelize";
import { sequelize } from '../services';
import { Resource, Task } from ".";

export class UseOfResource extends Model {
  public useOfResourceId!: number;
  public resourceId!: number;
  public taskId!: number;
}

UseOfResource.init({
  useOfResourceId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  resourceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Resource,
      key: 'resourceId'
    }
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Task,
      key: 'taskId'
    }
  },
}, {
  sequelize,
  modelName: 'UseOfResource',
  tableName: 'useOfResources',
  timestamps: false
});