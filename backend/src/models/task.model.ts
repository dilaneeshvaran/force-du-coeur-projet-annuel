import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';

export class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public deadline!: Date;
  public assigned_date!: Date;
  public status!:  'ongoing' | 'completed' | 'failed';
  public assignedTo!: number;
  public createdBy!: number;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  deadline: {
    type: DataTypes.DATE,
    allowNull: false
  },
  assigned_date: {
    type: DataTypes.DATE,
    allowNull: false 
  },
  status: {
    type: DataTypes.ENUM('ongoing', 'completed', 'failed'),
    allowNull: false
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: false, 
});

Task.belongsTo(User, { foreignKey: 'assignedTo' });