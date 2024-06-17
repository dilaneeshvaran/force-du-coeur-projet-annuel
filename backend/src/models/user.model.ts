import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Document } from ".";


export class User extends Model {
  static associate(models: any) {
    this.hasMany(models.Document, { foreignKey: 'senderId', as: 'sentDocuments' });
    this.hasMany(models.Document, { foreignKey: 'receiverId', as: 'receivedDocuments' });
  }
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
  public memberSince!: Date;
  public dateOfBirth!: Date;
}


User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    set(value: string) {
      this.setDataValue('email', value.toLowerCase());
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false
  },
  memberSince: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, 
});
