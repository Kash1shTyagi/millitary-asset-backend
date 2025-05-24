module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'transfers',
    timestamps: true
  });

  Transfer.associate = (models) => {
    Transfer.belongsTo(models.Asset, {
      foreignKey: 'assetId',
      as: 'asset'
    });
    Transfer.belongsTo(models.Base, {
      foreignKey: 'fromBaseId',
      as: 'fromBase'
    });
    Transfer.belongsTo(models.Base, {
      foreignKey: 'toBaseId',
      as: 'toBase'
    });
  };

  return Transfer;
};