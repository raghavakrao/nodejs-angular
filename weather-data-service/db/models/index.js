const Sequelize = require('sequelize');
const config = require('../../config/index');
let db = {};
let sequelize = new Sequelize(config.development);
const TemperatureLabel = require('./TemperatureLabel')(sequelize, Sequelize.DataTypes);
db[TemperatureLabel.name] = TemperatureLabel;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;