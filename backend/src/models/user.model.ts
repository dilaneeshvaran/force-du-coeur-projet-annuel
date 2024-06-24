import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import crypto from 'crypto';
import { Document } from ".";


export class User extends Model {
  static associate(models: any) {
    this.hasMany(models.Document, { foreignKey: 'senderId', as: 'sentDocuments' });
    this.hasMany(models.Document, { foreignKey: 'receiverId', as: 'receivedDocuments' });
  }
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public firstname!: string;
  public lastname!: string;
  public verificationCode!: string;
  public passwordResetCode!: string | null;  
  public verified!: boolean;
  public role!: "user" | "admin";
  public memberSince!: Date;
  public dateOfBirth!: Date;
  public phoneNumber!:number
  public country!: string;
  public city!: string;
  public address!: string;
  public createdAt!: Date;
  public isBan!: boolean;
}

export const generateValidationCode = (): string => {
  return crypto.randomBytes(8).toString('hex');
}

export function associateUser() {
  User.hasMany(Document, { foreignKey: 'senderId' });
  User.hasMany(Document, { foreignKey: 'receiverId' });
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    set(value: string) {
      this.setDataValue('username', value.toLowerCase());
    }
  },
  password: {
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
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: generateValidationCode
  },
  passwordResetCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },  role: {
    type: DataTypes.ENUM,
    values: ['user', 'admin'],
    allowNull: false,
    defaultValue: 'user'
  },
  memberSince: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },  phoneNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },isBan: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false
  },
  
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, 
});
