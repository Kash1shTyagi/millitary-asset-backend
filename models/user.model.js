module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('Admin','BaseCommander','LogisticsOfficer'),
      allowNull: false
    },
    baseId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'Bases', key: 'id' },
      onDelete: 'SET NULL'
    }
  }, {
    tableName: 'Users',
    timestamps: true
  });

  User.associate = models => {
    User.belongsTo(models.Base, { foreignKey: 'baseId', as: 'base' });
  };

  return User;
};
