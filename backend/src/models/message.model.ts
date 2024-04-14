import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Message extends Model {
  public messageId!: number;
  public content!: string;
  public creationDate!: Date;
  public authorId!: number;
  public recipientId!: number;
}

Message.init({
  messageId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'memberId'
    }
  },
  recipientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'memberId'
    }
  }
}, {
  sequelize,
  modelName: 'Message',
  tableName: 'messages',
  timestamps: false
});

//
Member.hasMany(Message, { foreignKey: 'authorId', as: 'sentMessages' });
//
Member.hasMany(Message, { foreignKey: 'recipientId', as: 'receivedMessages'});
