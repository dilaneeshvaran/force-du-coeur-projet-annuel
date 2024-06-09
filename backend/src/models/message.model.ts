import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Message extends Model {
  public id!: number;
  public subject!: string;
  public message?: string;
  public type!: 'sent' | 'received';
  public fileAttachment?: string;
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
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: false
});

//
Member.hasMany(Message, { foreignKey: 'id', as: 'sentMessages' });
//
Member.hasMany(Message, { foreignKey: 'id', as: 'receivedMessages'});