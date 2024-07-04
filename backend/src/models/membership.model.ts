import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model';
import { Alert } from './alert.model';

class Membership extends Model {
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

Membership.addHook('afterCreate', async (membership: Membership) => {
  const user = await User.findByPk(membership.userId);
  if (user) {
    await Alert.create({
      label: 'Nouveau Membre',
      description: `${user.firstname} ${user.lastname} (${user.email}) vient d'adhérer, avec un montant de ${membership.amount}.`,
      date: new Date()
    });
  }
});

export { Membership };
