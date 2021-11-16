const express = require('express');

const app = express();
const Routes = require('./routes');

module.exports = (config) => {
  const log = config.log();

  // Add a request logging middleware in development mode
  if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  app.set('view engine', 'ejs');

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use('/', Routes());

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  return app;
};
