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
    ]
  };

  epilogueResources.recipe = epilogue.resource(resourceDefinition);
};
