module.exports = (sequelize, DataTypes) => {
  const Base = sequelize.define('Base', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'bases',
    timestamps: true
  });

  Base.associate = (models) => {
    Base.hasMany(models.User, {
      foreignKey: 'baseId',
      as: 'personnel'
    });
    Base.hasMany(models.Asset, {
      foreignKey: 'baseId',
      as: 'assets'
    });
  };

  return Base;
};