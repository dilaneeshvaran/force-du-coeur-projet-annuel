import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Membership extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
  public id!: number;
  public amount!: 10 | 30 | 50 | 100;
  public paymentDate!: Date;
  public userId!: number;
  public status!: 'active' | 'inactive';
}

Membership.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.ENUM('10', '30', '50', '100'),
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }, 
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Membership',
  tableName: 'memberships',
  timestamps: false
});