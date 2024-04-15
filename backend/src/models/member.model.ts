import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';

export class Member extends Model {
  public memberId! : number;
  public name! : string;
  public firstName! : string;
  public email! : string;
  public password! : string;
  public role! :  'admin' | 'member';
  public memberSince!: Date;
  public dateOfBirth! : Date;
}

Member.init({
  memberId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }, 
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  role: {
    type: DataTypes.ENUM('admin', 'member'),
    allowNull: false
  }, 
  memberSince: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Member',
  tableName: 'members',
  timestamps: false, 
});