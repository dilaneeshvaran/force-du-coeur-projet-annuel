import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member, User } from ".";

export class Document extends Model {
  public documentId!: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public creationDate!: string;
  public authorId!: number;
  public isArchieved!: boolean;
  public receiverId!: number;
  public senderId!: number;
  public file!: string;
}

Document.init({
  documentId: {
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
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Updated to User
      key: 'userId' // Updated to userId
    }
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Updated to User
      key: 'userId' // Updated to userId
    }
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Updated to User
      key: 'userId' // Updated to userId
    }
  },
  isArchieved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  file: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'documents',
  timestamps: false
});


User.hasMany(Document, { foreignKey: 'authorId' }); // Updated to User
User.hasMany(Document, { foreignKey: 'senderId' }); // Updated to User
User.hasMany(Document, { foreignKey: 'receiverId' }); // Updated to User