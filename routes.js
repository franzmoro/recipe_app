'use strict';
const walkSync = require('walk-sync');
const epilogue = require('epilogue');

module.exports = ({ app, config, db }) => {
  epilogue.initialize({
    app,
    sequelize: db.sequelize,
    base: config.apiBaseUrl
  });
  let epilogueResources = {};
  const routeFiles = walkSync(__dirname, { globs: ['**/*.route.js'] });
  routeFiles.forEach(file => {
    require('./' + file)({ app, db, epilogue, epilogueResources, config });
  });
  return epilogueResources;
};
