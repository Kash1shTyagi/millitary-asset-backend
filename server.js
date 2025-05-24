const { sequelize, testConnection, loadModels } = require('./config/database');

// Initialize database
loadModels();
testConnection();