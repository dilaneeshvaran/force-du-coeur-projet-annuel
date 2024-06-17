import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Donation extends Model {
  static associate(models: any) {
    this.belongsTo(models.User, { foreignKey: 'donorId', as: 'donor' });
  }
  public id!: number;
  public amount!: number;
  public donationDate!: Date;
  public fullname!: string;
  public paymentMethod!: string;
  public email!: string;
  public frequency!: 'monthly' | 'yearly' | 'none';
  public donorId!: number;
}

Donation.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  donationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  frequency: {
    type: DataTypes.ENUM('monthly', 'yearly', 'none'),
    allowNull: false
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Donation',
  tableName: 'donations',
  timestamps: false
});

