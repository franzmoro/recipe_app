'use strict';
const {
  request,
  config,
} = require('../../utils/test.utils').initializeTest();

const resourceBaseUrl = `${config.apiBaseUrl}/recipes`;
const recipesFixture = require('./recipe.fixture');

describe('RECIPE TESTS', () => {
  it('should GET all recipes', () => {
    return request
      .get(resourceBaseUrl)
      .send()
      .expect(200)
      .then(({ body: recipes }) => {
        recipes.length.should.equal(recipesFixture.length);
      });
  });
});
