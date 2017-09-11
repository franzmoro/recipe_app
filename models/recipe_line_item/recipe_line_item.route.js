'use strict';

module.exports = ({ db, epilogue, epilogueResources }) => {
  const resourceDefinition = {
    model: db.RecipeImage,
    endpoints: ['/recipe_line_items', '/recipe_line_items/:id'],
    pagination: true,
    actions: ['list', 'read'],
  };

  epilogueResources.recipeItem = epilogue.resource(resourceDefinition);
};
