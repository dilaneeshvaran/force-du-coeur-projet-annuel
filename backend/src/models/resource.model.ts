import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Task } from ".";

export class Resource extends Model {
  static associate(models: any) {
    this.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' });
  }
  public id!: number;
  public label!: string;
  public type!: string;
  public description!: string;
  public status!: 'used' | 'not used' | 'wasted';
  public createdDate!: Date;
  public usedDate?: Date;
  public wastedDate?: Date;
  public taskId!: number; 
}

Resource.init({
  id: {
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
  },
  status: {
    type: DataTypes.ENUM('used', 'not used', 'wasted'),
    allowNull: false
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  usedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  wastedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  taskId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: Task,
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'Resource',
  tableName: 'resources',
  timestamps: false
});
