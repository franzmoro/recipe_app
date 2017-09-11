'use strict';

const qs = require('querystring');
const { omit, uniq } = require('lodash');
const {
  request,
  config,
  expect,
  getFixtureData,
} = require('../../utils/test.utils').initializeTest();

const NON_FIXTURE_FIELDS = [
  'created_at', 'updated_at', 'images', 'lineItems'
];
const RESOURCE_BASE_URL = `${config.apiBaseUrl}/recipes`;

const recipesFixture = getFixtureData('recipe');
const recipeImagesFixture = getFixtureData('recipe_image');
const recipeLineItemsFixture = getFixtureData('recipe_line_item');

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

  it('should include recipe images along with response', () => {
    return request
      .get(RESOURCE_BASE_URL)
      .send()
      .expect(200)
      .then(({ body: recipes }) => {
        const recipesWithImages = recipes.filter(
          ({ images }) => images.length
        );
        recipesWithImages.length.should.equal(recipeImagesFixture.length);

        recipesWithImages.forEach(({ images }) => {
          const [{ url: firstImageUrl }] = images;
          const { url: fixtureMatch } = recipeImagesFixture.find(image => {
            return image.url = firstImageUrl;
          });
          fixtureMatch.should.exist;
        });
      });
  });

  it('should include recipe line items along with response', () => {
    return request
      .get(RESOURCE_BASE_URL)
      .send()
      .expect(200)
      .then(({ body: recipes }) => {
        const recipesWithLineItems = recipes.filter(
          ({ lineItems }) => lineItems.length
        );
        const expectedRecipes = uniq(
          recipeLineItemsFixture.map(lineItem => lineItem.recipeId)
        );
        recipesWithLineItems.length.should.be.above(0);
        recipesWithLineItems.length.should.equal(expectedRecipes.length);
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

        const actualRecipe = omit(foundRecipes[0], NON_FIXTURE_FIELDS);
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
          .map(recipe => omit(recipe, NON_FIXTURE_FIELDS))
          .sort(sortingFn);

        foundRecipes.length.should.equal(expectedRecipes.length);
        expect(foundRecipesNoTimestamp).to.deep.equal(expectedRecipes);
      });
  });
});
