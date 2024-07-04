import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';
import { Alert } from './alert.model';

class Donation extends Model {
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
  fullname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
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
      key: 'id'
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

Donation.belongsTo(User, { foreignKey: 'donatorId' });

Donation.addHook('afterCreate', async (donation: Donation) => {
  await Alert.create({
    label: 'Nouveau Don',
    description: `Un don de ${donation.amount} euros a été fait par ${donation.fullname}, email :  (${donation.email}).`,
    date: new Date()
  });
});

export { Donation };
