import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from "./user.model";

export class Message extends Model {
  public id?: number;
  public userId?: number;
  public fullName?: string;
  public email?: string; 
  public subject?: string;
  public message?: string;
  public type?: 'sent' | 'received';
  public fileAttachment?: string;
  public createdAt?: Date;
  public senderMail?: string;
  public receiverMail?: string;
  public replyAdminId?: number;
  public replied?: boolean;
  public concernedMsgId?: number;
}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('sent', 'received'),
    allowNull: true,
  },
  fileAttachment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  senderMail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  receiverMail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  replyAdminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },replied: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },concernedMsgId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: false
});

User.hasMany(Message, { foreignKey: 'senderMail', as: 'sentMessages' });
User.hasMany(Message, { foreignKey: 'receiverMail', as: 'receivedMessages' });