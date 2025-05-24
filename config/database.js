const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.url, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false 
    } : false
  },
  define: {
    timestamps: true,
    underscored: true
  }
});


const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synced');
    }
  } catch (error) {
    console.error('Unable to connect to database:', error);
    process.exit(1);
  }
};


const loadModels = () => {
  const modelDefiners = [
    require('../models/user.model'),
    require('../models/base.model'),
    require('../models/asset.model'),
    require('../models/purchase.model'),
    require('../models/transfer.model'),
    require('../models/assignment.model'),
    require('../models/auditLog.model')
  ];

  for (const definer of modelDefiners) {
    definer(sequelize, Sequelize.DataTypes);
  }

  const { User, Base, Asset, Purchase, Transfer } = sequelize.models;
  
  User.belongsTo(Base, { foreignKey: 'base_id' });
  Base.hasMany(User, { foreignKey: 'base_id' });

  Purchase.belongsTo(Asset, { foreignKey: 'asset_id' });
  Purchase.belongsTo(Base, { foreignKey: 'base_id' });

  Transfer.belongsTo(Asset, { foreignKey: 'asset_id' });
  Transfer.belongsTo(Base, { as: 'FromBase', foreignKey: 'from_base_id' });
  Transfer.belongsTo(Base, { as: 'ToBase', foreignKey: 'to_base_id' });
};


module.exports = {
  sequelize,
  testConnection,
  loadModels
};