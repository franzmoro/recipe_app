const {
  transformDataToSequelizeFixture,
  generateUUID,
} = require('../../utils/fixture.utils');

const { data: lemonChickenRecipe } = require('../recipe/recipe.fixture')
  .find(({ data: recipe }) => recipe.name === 'Lemon Chicken');

const MODEL_NAME = 'RecipeImage';

const fixtureData = [
  {
    id: generateUUID(),
    recipeId: lemonChickenRecipe.id,
    url: '/assets/lemon-chicken.jpg',
  }
];

module.exports = transformDataToSequelizeFixture(MODEL_NAME, fixtureData);
