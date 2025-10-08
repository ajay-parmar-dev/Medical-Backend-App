const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const config = require('./config/config');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/error');
const sequelize = require('./config/sequelize');
const swaggerSetup = require('./docs/swagger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

(async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connected');
    await sequelize.sync();
  } catch (err) {
    logger.error('DB connection failed: %s', err.message);
    process.exit(1);
  }
})();

const authRoute = require('./routes/v1/auth.route');
app.use('/v1/auth', authRoute);

swaggerSetup(app);

app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port} in ${config.env}`);
});

module.exports = app;


