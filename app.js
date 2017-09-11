'use strict';
const express = require('express');

const { NODE_ENV = 'development' } = process.env;
const config = require('./config');
const db = require('./models').initializeDB(config);
const app = express();

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
