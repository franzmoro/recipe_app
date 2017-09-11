'use strict';
const { NODE_ENV } = process.env;

const config = {
  common: {
    port: 8080,
    apiBaseUrl: '/api/v1',
    connectionString: 'mysql://root@localhost:3306/recipe_dev'
  },
  test: {
    port: 8081,
    connectionString: 'mysql://root@localhost:3306/recipe_test'
  }
};

module.exports = Object.assign({}, config.common, config[NODE_ENV]);
