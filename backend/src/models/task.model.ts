import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Task extends Model {
  public taskId!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!:  'pending' | 'in progress' | 'completed';
  // clé etrangère vers la clé primaire de la table Member
  public responsibleId!: number;
}

Task.init({
  taskId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    //unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    //unique: true
  }, 
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in progress', 'completed'),
    allowNull: false
  },
  responsibleId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: false, 
});

Task.belongsTo(Member, { foreignKey: 'responsibleId' });