import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Message extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sentMessages' });
    this.belongsTo(models.User, { foreignKey: 'receiverId', as: 'receivedMessages' });
  }
  public id!: number;
  public title!: string;
  public description?: string;
  public type!: 'sent' | 'received';
  public senderId!: number;
  public receiverId!: number;
  public createdDate!: Date;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('sent', 'received'),
    allowNull: false,
  },
  fileAttachment: {
    type: DataTypes.STRING,
    allowNull: true,
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
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: false
});
