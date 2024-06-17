import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Survey, Answer } from ".";

export class Question extends Model {
  static associate(models: any) {
    this.belongsTo(models.Survey, { foreignKey: 'surveyId', as: 'survey' });
    this.hasMany(models.Answer, { foreignKey: 'questionId', as: 'answers'});
  }
  public id!: number;
  public text!: string;
  public type!: string;
  public options?: string[];
  public surveyId!: number;
 
}

Question.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  options: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  surveyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Survey,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Question',
  tableName: 'questions',
  timestamps: false
});