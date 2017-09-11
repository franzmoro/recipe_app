const {
  transformDataToSequelizeFixture,
  generateUUID,
} = require('../../utils/fixture.utils');

const { data: lemonChickenRecipe } = require('../recipe/recipe.fixture')
  .find(({ data: recipe }) => recipe.name === 'Lemon Chicken');

const ingredientsFixture = require('../ingredient/ingredient.fixture');
const findIngredientRecordId = ingredientName => ingredientsFixture.find(
  ({ data: { name } }) => name === ingredientName
).data.id;

const MODEL_NAME = 'RecipeLineItem';

const fixtureData = [
  {
    id: generateUUID(),
    recipeId: lemonChickenRecipe.id,
    ingredientId: findIngredientRecordId('Chicken Breast'),
    quantity: 4,
  }, {
    id: generateUUID(),
    recipeId: lemonChickenRecipe.id,
    ingredientId: findIngredientRecordId('Thyme'),
    quantity: 1,
    unit: 'tsp'
  }, {
    id: generateUUID(),
    recipeId: lemonChickenRecipe.id,
    ingredientId: findIngredientRecordId('Lemon'),
    quantity: 1,
  }
];

module.exports = transformDataToSequelizeFixture(MODEL_NAME, fixtureData);
