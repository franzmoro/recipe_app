const {
  transformDataToSequelizeFixture,
  generateUUID,
} = require('../../utils/fixture.utils');

const MODEL_NAME = 'Ingredient';

const fixtureData = [
  'Chicken Breast',
  'Thyme',
  'Lemon',
  'Egg',
  'Sugar',
  'Salt',
  'Olive Oil',
].map(name => ({
  id: generateUUID(),
  name
}));

module.exports = transformDataToSequelizeFixture(MODEL_NAME, fixtureData);
