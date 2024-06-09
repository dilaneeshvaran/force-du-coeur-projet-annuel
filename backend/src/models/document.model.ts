import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Document extends Model {

  public id!: number;
  public title!: string;
  public description!: string;
  public file!: string;
  public isArchieved!: boolean;
  public senderId!: number;
  public receiverId!: number;

  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
    this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receiver' });
  }
}

Document.init({
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
  file: {
    type: DataTypes.STRING,
    allowNull: true
  },
  isArchieved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'documents',
  timestamps: false
});
