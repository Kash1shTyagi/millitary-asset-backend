module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'purchases',
    timestamps: true
  });

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Asset, {
      foreignKey: 'assetId',
      as: 'asset'
    });
    Purchase.belongsTo(models.Base, {
      foreignKey: 'baseId',
      as: 'base'
    });
  };

  return Purchase;
};