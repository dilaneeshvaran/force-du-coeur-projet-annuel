import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from "./user.model";

export class Member extends Model {
  public memberId! : number;
  public userId!: number;
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
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
    allowNull: false,
    defaultValue: 'member'
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
  timestamps: false
});

User.hasOne(Member, { foreignKey: 'userId' });
Member.belongsTo(User, { foreignKey: 'userId' });