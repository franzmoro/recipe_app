'use strict';
const { join } = require('path');
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
      expect: chai.expect,

      getFixtureData(resourcePath) {
        const fileName = join(
          __dirname,
          `../models/${resourcePath}/${resourcePath}.fixture`
        );
        return require(fileName).map(({ data }) => data);
      },
    };
  },
};
