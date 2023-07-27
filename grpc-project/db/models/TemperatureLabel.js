const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TemperatureLabel', {
    id: {
      field: 'id',
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    minTemperature: {
      field: 'min_temperature',
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxTemperature: {
      field: 'max_temperature',
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    label: {
      field: 'label',
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    sequelize,
    tableName: 'temparature_label',
    timestamps: false,
  });
};
