module.exports = (sequelize, DataTypes) => {
  const Base = sequelize.define('Base', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    location: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'Bases',
    timestamps: true
  });

  Base.associate = models => {
    Base.hasMany(models.User,      { foreignKey: 'baseId' });
    Base.hasMany(models.Asset,     { foreignKey: 'baseId' });
    Base.hasMany(models.Purchase,  { foreignKey: 'baseId' });
    Base.hasMany(models.Assignment,{ foreignKey: 'baseId' });
    Base.hasMany(models.Transfer,  { foreignKey: 'fromBaseId', as: 'outgoing' });
    Base.hasMany(models.Transfer,  { foreignKey: 'toBaseId',   as: 'incoming' });
  };

  return Base;
};
