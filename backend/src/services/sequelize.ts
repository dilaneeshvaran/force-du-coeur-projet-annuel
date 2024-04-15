import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('force', 'admin', 'admin', {
  host: 'localhost',
  port: 3303,
  dialect: 'mysql',
});