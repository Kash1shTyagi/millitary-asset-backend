module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    date:     { type: DataTypes.DATEONLY, allowNull: false },
    baseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Bases', key: 'id' },
      onDelete: 'CASCADE'
    },
    assetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Assets', key: 'id' },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'Purchases',
    timestamps: true
  });

  Purchase.associate = models => {
    Purchase.belongsTo(models.Base,  { foreignKey: 'baseId' });
    Purchase.belongsTo(models.Asset, { foreignKey: 'assetId' });
  };

  return Purchase;
};
