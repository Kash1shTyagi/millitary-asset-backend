module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    type: {
      type: DataTypes.ENUM('vehicle', 'weapon', 'ammo'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'assets',
    timestamps: true
  });

  Asset.associate = (models) => {
    Asset.belongsTo(models.Base, {
      foreignKey: 'baseId',
      as: 'base'
    });
  };

  return Asset;
};