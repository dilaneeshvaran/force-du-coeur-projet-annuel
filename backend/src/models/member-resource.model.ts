import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from './user.model'; // Adjust the path as necessary
import { Resource } from './resource.model';

export class MemberResource extends Model {
  public memberId!: number;  
  public resourceId!: number;  
}

MemberResource.init({
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  resourceId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'MemberResource',
  tableName: 'memberResources',
  timestamps: false
});

MemberResource.belongsTo(User, { foreignKey: 'memberId' });
MemberResource.belongsTo(Resource, { foreignKey: 'resourceId' });