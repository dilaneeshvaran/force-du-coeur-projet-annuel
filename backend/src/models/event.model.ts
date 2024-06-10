import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';

export class Event extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public date!: Date;
  public location!: string;
  public availableSpots!: number;
  public membersOnly!: boolean; 
}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  availableSpots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  membersOnly: { 
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: 'Event',
  tableName: 'events',
  timestamps: false, 
});