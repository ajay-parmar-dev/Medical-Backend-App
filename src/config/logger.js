const { createLogger, format, transports } = require('winston');
const config = require('./config');

const logger = createLogger({
  level: config.logLevel,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;


