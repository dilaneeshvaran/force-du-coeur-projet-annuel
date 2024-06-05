import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import argon2 from 'argon2';
import crypto from 'crypto';


export class User extends Model {
  public userId!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public firstname!: string;
  public lastname!: string;
  public verificationCode!: string;
  public passwordResetCode!: string | null;  
  public verified!: boolean;

  public async validPassword(password: string): Promise<boolean> {
    return argon2.verify(this.password, password);
  }
}

export const generateValidationCode = (): string => {
  return crypto.randomBytes(8).toString('hex');
}

User.init({
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
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
    allowNull: false,
    defaultValue: generateValidationCode
  },
  passwordResetCode: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  },
  verified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  timestamps: false, 
});
