const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/errorHandler');
const auditLogger = require('./middlewares/auditLogger');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(auditLogger);

// Routes
const authRoutes = require('./routes/auth.routes'); 
app.use('/auth', authRoutes);;
app.use('/api/dashboard', require('./routes/dashboard.routes'));
app.use('/api/purchase', require('./routes/purchase.routes'));
app.use('/api/transfer', require('./routes/transfer.routes'));
const assignmentRouter = require('./routes/assignment.routes');

app.use('/api/assignment', assignmentRouter);
app.use('/api/base', require('./routes/base.routes'));
const assetRoutes = require('./routes/asset.routes');
app.use('/api/asset', assetRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Military Asset Management API is running' });
});

// Error Handler
app.use(errorHandler);

// Start Server
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected');
    return sequelize.sync(); // optional: force: true to reset DB
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });
