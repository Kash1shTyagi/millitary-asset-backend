module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    assignee: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    expended: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
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
    tableName: 'Assignments',
    timestamps: true
  });

  Assignment.associate = models => {
    Assignment.belongsTo(models.Base,  { foreignKey: 'baseId' });
    Assignment.belongsTo(models.Asset, { foreignKey: 'assetId' });
  };

  return Assignment;
};
