module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    personnel_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'assignments',
    timestamps: true
  });

  Assignment.associate = (models) => {
    Assignment.belongsTo(models.Asset, {
      foreignKey: 'assetId',
      as: 'asset'
    });
  };

  return Assignment;
};