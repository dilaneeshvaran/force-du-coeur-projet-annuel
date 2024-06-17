import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from './../services';
import { User } from './user.model';
import { Donation } from './donation.model';
import { Membership } from './membership.model';

export class Payment extends Model {
    public id!: number;
    public user_id!: number;
    public stripe_payment_intent_id!: string;
    public stripe_customer_id!: string;
    public amount!: number;
    public type!: "donation"  |"membership";
    public datePaiement!: Date;
    public typeId!: number; // This will hold the id of the Donation or Membership
}

    Payment.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            }
        },
        stripe_payment_intent_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stripe_customer_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        typeId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
        datePaiement: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'Payment',
        tableName: 'payments',
        timestamps: false,
    });

    Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });

    Payment.belongsTo(Donation, { foreignKey: 'typeId', constraints: false, as: 'donation' });
    Donation.hasMany(Payment, { foreignKey: 'typeId', constraints: false, scope: { type: 'donation' } });

    Payment.belongsTo(Membership, { foreignKey: 'typeId', constraints: false, as: 'membership' });
    Membership.hasMany(Payment, { foreignKey: 'typeId', constraints: false, scope: { type: 'membership' } });