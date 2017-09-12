const { loadFixtures } = require('sequelize-fixtures');
const { transformDataToSequelizeFixture } = require('../utils/fixture.utils');
const config = require('../config');
const dbUrl = process.env.CONNECTION_STRING || config.connectionString;
const seedFixtureData = require('../seeds/seeds.json');


const db = require('../models').initializeDB({ connectionString: dbUrl });

const seedFixtures = seedFixtureData.reduce(
  (allFixtures, currentFixture) => {
    const { model, data } = currentFixture;
    return [
      ...allFixtures,
      ...transformDataToSequelizeFixture(model, data)
    ];
  },
  []
);

db.sequelize.sync({ force: true })
  .then(() => loadFixtures(seedFixtures, db))
  .then(() => {
    console.log('done inserting seeds'); // eslint-disable-line
    process.exit(1);
  })
  .catch(err => {
    console.log('There was an error inserting seeds in db', err); // eslint-disable-line
    process.exit(-1);
  });
