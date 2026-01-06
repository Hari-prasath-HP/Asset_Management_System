const { Sequelize } = require('sequelize');
const dbConfig = require('./database.js');

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.DB_HOST,
    dialect: dbConfig.DB_DIALECT,
    logging: false
  }
);

module.exports = sequelize;
