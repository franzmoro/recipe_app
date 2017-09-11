'use strict';

module.exports = ({ db, epilogue, epilogueResources }) => {
  const resourceDefinition = {
    model: db.RecipeImage,
    endpoints: ['/recipe_images', '/recipe_images/:id'],
    pagination: true,
    actions: ['list', 'read']
  };

  epilogueResources.recipe = epilogue.resource(resourceDefinition);
};
