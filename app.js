'use strict';
const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const { NODE_ENV = 'development' } = process.env;
const config = require('./config');
const db = require('./models').initializeDB(config);
const app = express();

const whitelist = [
  'http://localhost:9000'
];
const corsOptions = {
  origin: (origin, callback) => {
    const originIsWhitelisted = whitelist.includes(origin);
    callback(null, originIsWhitelisted);
  },
};

app.use(cors(corsOptions));
app.use(logger('dev'));

app.get('/', (req, res) => res.status(200).json('Recipe App API'));
require('./routes')({ app, config, db });

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const server = app.listen(config.port || 8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log( // eslint-disable-line
    'Recipe app server (%s) listening at http://%s:%s', NODE_ENV, host, port
  );
});

module.exports = app;
