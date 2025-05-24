module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name:             { type: DataTypes.STRING, allowNull: false },
    type:             { type: DataTypes.ENUM('Weapon','Vehicle','Ammunition'), allowNull: false },
    current_quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    baseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Bases', key: 'id' },
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'Assets',
    timestamps: true
  });

  Asset.associate = models => {
    Asset.belongsTo(models.Base,       { foreignKey: 'baseId' });
    Asset.hasMany(models.Purchase,      { foreignKey: 'assetId' });
    Asset.hasMany(models.Transfer,      { foreignKey: 'assetId' });
    Asset.hasMany(models.Assignment,    { foreignKey: 'assetId' });
  };

  return Asset;
};
