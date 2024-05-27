import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member, Resource } from ".";

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

MemberResource.belongsTo(Member, { foreignKey: 'memberId' });
MemberResource.belongsTo(Resource, { foreignKey: 'resourceId' });