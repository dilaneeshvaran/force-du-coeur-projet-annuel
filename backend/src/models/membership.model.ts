import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Membership extends Model {
  public membershipId!: number;
  public amount!: number;
  public paymentDate!: Date;
  public memberId!: number;
  public status!: 'pending' | 'paid';
}

Membership.init({
  membershipId: {
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
      model: Member,
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

Member.hasMany(Membership, { foreignKey: 'memberId' });