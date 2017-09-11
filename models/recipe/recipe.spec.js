'use strict';

const qs = require('querystring');
const { omit } = require('lodash');
const {
  request,
  config,
  expect,
} = require('../../utils/test.utils').initializeTest();

const TIMESTAMP_FIELDS = ['created_at', 'updated_at'];
const RESOURCE_BASE_URL = `${config.apiBaseUrl}/recipes`;
const recipesFixture = require('./recipe.fixture').map(({ data }) => data);

describe('RECIPE TESTS', () => {
  it('should GET all recipes', () => {
    return request
      .get(RESOURCE_BASE_URL)
      .send()
      .expect(200)
      .then(({ body: recipes }) => {
        recipes.length.should.equal(recipesFixture.length);
      });
  });

  it('should get by query input NAME COMPLETE', () => {
    const RECIPE_NAME = 'Lemon Chicken';
    const queryString = qs.stringify({ search: RECIPE_NAME });
    return request
      .get(`${RESOURCE_BASE_URL}?${queryString}`)
      .send()
      .expect(200)
      .then(({ body: foundRecipes }) => {
        foundRecipes.length.should.equal(1);

        const [expectedRecipe] = recipesFixture
          .filter(recipe => recipe.name === RECIPE_NAME);

        const TIMESTAMP_FIELDS = ['created_at', 'updated_at'];
        const actualRecipe = omit(foundRecipes[0], TIMESTAMP_FIELDS);
        expect(actualRecipe).to.deep.equal(expectedRecipe);
      });
  });

  it('should get by query input NAME PARTIAL', () => {
    const PARTIAL_RECIPE_NAME = 'Chicken';

    const queryString = qs.stringify({ search: PARTIAL_RECIPE_NAME });
    return request
      .get(`${RESOURCE_BASE_URL}?${queryString}`)
      .send()
      .expect(200)
      .then(({ body: foundRecipes }) => {

        const sortingFn = (recipeA, recipeB) => {
          return recipeA.name > recipeB.name ? 1 : -1;
        };
        const expectedRecipes = recipesFixture
          .filter(recipe => recipe.name.includes(PARTIAL_RECIPE_NAME))
          .sort(sortingFn);

        const foundRecipesNoTimestamp = foundRecipes
          .map(recipe => omit(recipe, TIMESTAMP_FIELDS))
          .sort(sortingFn);

        foundRecipes.length.should.equal(expectedRecipes.length);
        expect(foundRecipesNoTimestamp).to.deep.equal(expectedRecipes);
      });
  });
});
