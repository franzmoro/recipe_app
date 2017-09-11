'use strict';

module.exports = ({ db, epilogue, epilogueResources }) => {
  const resourceDefinition = {
    model: db.Recipe,
    endpoints: ['/recipes', '/recipes/:id'],
    pagination: true,
    actions: ['list', 'read'],
  };

  epilogueResources.recipe = epilogue.resource(resourceDefinition);
};
