import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { Member } from ".";

export class Document extends Model {
  public documentId!: number;
  public title!: string;
  public description!: string;
  public type!: string;
  public creationDate!: string;
  public authorId!: number;
}

Document.init({
  documentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'memberId'
    }
  },
}, {
  sequelize,
  modelName: 'Document',
  tableName: 'documents',
  timestamps: false
});

Member.hasMany(Document, { foreignKey: 'authorId' });