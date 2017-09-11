'use strict';

module.exports = ({ db, epilogue, epilogueResources }) => {
  const resourceDefinition = {
    model: db.Ingredient,
    endpoints: ['/ingredients', '/ingredients/:id'],
    pagination: true,
    actions: ['list', 'read']
  };

  epilogueResources.recipeItem = epilogue.resource(resourceDefinition);
};
