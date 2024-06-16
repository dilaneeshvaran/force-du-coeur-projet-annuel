import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';

export class Membership extends Model {
  public id!: number;
  public amount!: number;
  public paymentDate!: Date;
  public memberId!: number;
  public status!: 'pending' | 'paid';
}

Membership.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'memberId'
    }
  }, 
  status: {
    type: DataTypes.ENUM('pending', 'paid'),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Membership',
  tableName: 'memberships',
  timestamps: false
});

User.hasMany(Membership, { foreignKey: 'memberId' });