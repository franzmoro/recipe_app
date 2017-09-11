'use strict';
const {
  request,
  config,
} = require('../../utils/test.utils').initializeTest();

const resourceBaseUrl = `${config.apiBaseUrl}/recipe_images`;
const recipeImagesFixture = require('./recipe_image.fixture');

describe('RECIPE IMAGES TESTS', () => {
  it('should GET all recipe images', () => {
    return request
      .get(resourceBaseUrl)
      .send()
      .expect(200)
      .then(({ body: recipeImages }) => {
        recipeImages.length.should.equal(recipeImagesFixture.length);
      });
  });
});
