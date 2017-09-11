'use strict';
const chai = require('chai');
const supertest = require('supertest');
const server = require('../app');
const request = supertest(server);
const config = require('../config');
const db = require('../models/index').initializeDB(config);

module.exports = {
  initializeTest() {
    return {
      db,
      config,
      request,
      should: chai.should(),
    };
  },
};
