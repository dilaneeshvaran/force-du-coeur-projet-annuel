import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';

export class Donation extends Model {
  public id!: number;
  public amount!: number;
  public donationDate!: Date;
  public fullname!: string;
  public paymentMethod!: string;
  public email!: string;
  public donationFrequency!: 'monthly' | 'yearly' | 'punctual';
  public donatorId!: number | null;
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
  fullname: { // New field
    type: DataTypes.STRING,
    allowNull: false
  },
  email: { // New field
    type: DataTypes.STRING,
    allowNull: false
  },
  donationFrequency: { 
    type: DataTypes.ENUM('monthly', 'yearly', 'punctual'),
    allowNull: false
  },
  donatorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'userId'
    }
  }, 
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Donation',
  tableName: 'donations',
  timestamps: false
});

User.hasMany(Donation, { foreignKey: 'donatorId' });