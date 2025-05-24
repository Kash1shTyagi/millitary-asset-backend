module.exports = (sequelize, DataTypes) => {
  const Transfer = sequelize.define('Transfer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity:   { type: DataTypes.INTEGER, allowNull: false },
    timestamp:  { type: DataTypes.DATE,    allowNull: false, defaultValue: DataTypes.NOW },
    fromBaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Bases', key: 'id' },
      onDelete: 'CASCADE'
    },
    toBaseId: {
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
    tableName: 'Transfers',
    timestamps: true
  });

  Transfer.associate = models => {
    Transfer.belongsTo(models.Base,  { as: 'fromBase', foreignKey: 'fromBaseId' });
    Transfer.belongsTo(models.Base,  { as: 'toBase',   foreignKey: 'toBaseId' });
    Transfer.belongsTo(models.Asset, { foreignKey: 'assetId' });
  };

  return Transfer;
};
