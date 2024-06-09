import { DataTypes, Model } from "sequelize";
import { sequelize } from './../services';
import { User } from ".";

export class Vote extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public votingType!: 'one-round' | 'two-round';
  public ongoingRound!: 'first-round' | 'second-round'; 
  public votingMethod!: 'majority rule' | 'absolute majority';
  public status!: 'open' | 'closed';
  public options!: { label: string, votes: number }[];
}

Vote.init({
  voteId: {
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  votingType: {
    type: DataTypes.ENUM('one-round', 'two-round'),
    allowNull: false
  },
  ongoingRound: {
    type: DataTypes.ENUM('first-round', 'second-round'),
    allowNull: false
  },
  votingMethod: {
    type: DataTypes.ENUM('majority rule', 'absolute majority'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('open', 'closed'),
    allowNull: false
  },
  options: {
    type: DataTypes.JSON,
    validate: {
      isArrayOfOptions(value: any) {
        if (!Array.isArray(value)) {
          throw new Error('il faut un tableau');
        }
        if (value.length > 10) {
          throw new Error('le tableau d\'options contient au maximum 10 éléments');
        } 
        value.forEach((option: any) => {
          if (typeof option.label !== 'string' || typeof option.votes !== 'number') {
            throw new Error('chaque option requiert un label et un nombre de votes');
          }
        });
      }
    }
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  voterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Updated to User
      key: 'userId' // Updated to userId
    }
  }
}, {
  sequelize,
  modelName: 'Vote',
  tableName: 'votes',
  timestamps: false
});
