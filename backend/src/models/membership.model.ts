import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';

export class Membership extends Model {
  public id!: number;
  public amount!: number;
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
    type: DataTypes.FLOAT,
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
    },
    onUpdate: 'CASCADE',  
    onDelete: 'CASCADE' 
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

User.hasMany(Membership, { foreignKey: 'userId' });
Membership.belongsTo(User, { foreignKey: 'userId' }); 
