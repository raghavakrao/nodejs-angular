module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Users', {
    id: {
      field: 'id',
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(255),
      allowNull: true
    },
    username: {
      field: 'username',
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true
  });
};
