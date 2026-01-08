require('dotenv').config();

const app = require('./app');
const sequelize = require('./config/sequelize');

require('./models');

const PORT = process.env.PORT || 3000;

// Start the server and connect to database
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    await sequelize.sync({ alter: true });
    console.log('Database models synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
