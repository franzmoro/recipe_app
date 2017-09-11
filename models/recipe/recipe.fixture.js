const {
  transformDataToSequelizeFixture,
  generateUUID,
} = require('../../utils/fixture.utils');

const MODEL_NAME = 'Recipe';

const fixtureData = [
  {
    id: generateUUID(),
    name: 'Lemon Chicken',
    cookingTimeMinutes: 30,
  }, {
    id: generateUUID(),
    name: 'Chicken Caesar Salad',
    cookingTimeMinutes: 25,
  }, {
    id: generateUUID(),
    name: 'Beef Stroganoff',
    cookingTimeMinutes: 30,
  }
];

module.exports = transformDataToSequelizeFixture(MODEL_NAME, fixtureData);
