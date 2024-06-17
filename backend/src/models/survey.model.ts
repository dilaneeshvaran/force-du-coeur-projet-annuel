import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User, Question, Answer } from ".";

export class Survey extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.User, { foreignKey: 'adminId', as: 'admin' });
    this.hasMany(models.Question, { foreignKey: 'surveyId', as: 'questions'});
  }
  public id!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!: 'open' | 'closed';
  public userId!: number;
  public adminId!: number;
}

Survey.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Survey',
  tableName: 'surveys',
  timestamps: false
});