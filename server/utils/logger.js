const {createLogger, format, transports} = require('winston');
const {colorize, combine, printf, splat, timestamp} = format;

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS ZZ';

let logger = null;

const _formatLogEntry = printf((info) => {
  return `${info.timestamp} [${info.level}] ${info.message} ${
    info.stack ? '\n' + info.stack : ''
  }`;
});

const TRANSPORT_OPTIONS = {
  console: {
    format: combine(
      colorize({all: true}),
      timestamp({format: TIMESTAMP_FORMAT}),
      splat(),
      _formatLogEntry
    ),
    handleExceptions: true,
    json: false,
    level: 'debug', // logs: debug, verbose, info, warn, error
  },
};

const _setLogger = () => {
  const consoleTransport = new transports.Console(TRANSPORT_OPTIONS.console);

  const _logger = new createLogger({
    exitOnError: false,
    transports: [consoleTransport],
  });

  // Create a stream object with a 'write' function that will be used by `morgan`
  _logger.stream = {
    write: (message) => {
      logger.error(message);
    },
  };

  logger = _logger;
};

const getLogger = () => {
  if (!logger) {
    _setLogger();
  }
  return logger;
};

module.exports = {
  getLogger,
};
