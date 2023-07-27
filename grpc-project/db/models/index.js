const Sequelize = require('sequelize');
const config = require('../../config/index');
let db = {};
let sequelize = new Sequelize(config.development);
const Users = require('./Users')(sequelize, Sequelize.DataTypes);
const TemperatureLabel = require('./TemperatureLabel')(sequelize, Sequelize.DataTypes);

db[Users.name] = Users;
db[TemperatureLabel.name] = TemperatureLabel;
db.sequelize = sequelize;
db.Op = Sequelize.Op;

module.exports = db;