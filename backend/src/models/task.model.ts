import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';
import { Alert } from './alert.model';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public deadline!: Date;
  public assigned_date!: Date;
  public status!: 'ongoing' | 'completed' | 'failed';
  public assignedTo!: number;
  public createdBy!: number;
  public completedDate!: Date;
  public failedDate!: Date;
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
  },
  completedDate: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  failedDate: {
    type: DataTypes.DATE,
    allowNull: true 
  }
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tasks',
  timestamps: false, 
});

Task.belongsTo(User, { foreignKey: 'assignedTo' });
Task.addHook('afterUpdate', async (task: Task) => {
  const user = await User.findByPk(task.assignedTo);
  if (user) {
    if (task.status === 'failed') {
      await Alert.create({
        label: 'Tache échouée',
        description: `La tache "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) est échoué.`,
        date: new Date()
      });
    } else if (task.status === 'completed') {
      await Alert.create({
        label: 'Tache complétée',
        description: `La tache "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) est complété.`,
        date: new Date()
      });
    } else if (task.status === 'ongoing' && new Date() > task.deadline) {
      await Alert.create({
        label: 'Deadline passé pour une tâche',
        description: `La tache :  "${task.title}" assigné à ${user.firstname} ${user.lastname} (${user.email}) a dépassé le deadline.`,
        date: new Date()
      });
    }
  }
});

export { Task };
