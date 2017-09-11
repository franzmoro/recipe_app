/* global before after */
const { loadFixtures } = require('sequelize-fixtures');
const config = require('../config');
const db = require('./index').initializeDB(config);

if (process.env.NODE_ENV !== 'test') {
  throw new Error('Tests can only be run with NODE_ENV=test');
}

const allFixtures = [
  ...require('./recipe/recipe.fixture'),
  ...require('./recipe_image/recipe_image.fixture'),
];

before(() => {
  return db.sequelize.sync({ force: true })
    .then(() => loadFixtures(allFixtures, db))
    .then(() => {
      console.log('tests will start'); // eslint-disable-line
    });
});

after(() => {
  console.log('end of tests'); // eslint-disable-line
});
