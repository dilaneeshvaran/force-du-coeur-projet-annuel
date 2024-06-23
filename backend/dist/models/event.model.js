"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const services_1 = require("./../services");
class Event extends sequelize_1.Model {
}
exports.Event = Event;
Event.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    availableSpots: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    participations: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    membersOnly: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    quota: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize: services_1.sequelize,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false,
});
