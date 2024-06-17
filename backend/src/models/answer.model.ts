import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Question, User } from ".";

export class Answer extends Model {
  static associate(models: any) {
    this.belongsTo(models.Question, { foreignKey: 'questionId', as: 'question' });
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
  }
  public id!: number;
  public response!: string;
  public questionId!: number;
  public userId!: number;
 
}

Answer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  response: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Question,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Answer',
  tableName: 'Answers',
  timestamps: false
});