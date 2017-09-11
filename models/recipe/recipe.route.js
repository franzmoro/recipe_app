'use strict';

module.exports = ({ db, epilogue, epilogueResources }) => {
  const resourceDefinition = {
    model: db.Recipe,
    endpoints: ['/recipes', '/recipes/:id'],
    actions: ['list', 'read'],
    search: [
      {
        operator: '$like',
        param: 'search',
        attributes: ['name']
      }
    ],
    include: [
      {
        model: db.RecipeImage,
        as: 'images',
        attributes: ['url'],
      }, {
        model: db.RecipeLineItem,
        as: 'lineItems',
        attributes: ['quantity', 'unit'],
        include: [
          {
            model: db.Ingredient,
            as: 'ingredient',
            attributes: ['name'],
          }
        ]
      },
    ]
  };

  epilogueResources.recipe = epilogue.resource(resourceDefinition);
};
