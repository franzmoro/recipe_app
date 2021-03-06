'use strict';

module.exports = ({ app, db, config }) => {

  const inclusionQuery = {
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

  app.get(`${config.apiBaseUrl}/recipes`, (req, res, next) => {
    const { search: searchInput, maxCookingTimeMinutes } = req.query;

    const dbFriendlyInput = searchInput && `%${searchInput.toLowerCase()}%`;
    const queryWithTextSearch = Object.assign(
      {},
      inclusionQuery,
      {
        where: {
          $or: [
            { 'name': { $like: dbFriendlyInput } },
            { '$lineItems.ingredient.name$': { $like: dbFriendlyInput } },
          ]
        }
      }
    );

    const dbQuery = searchInput ? queryWithTextSearch : inclusionQuery;

    if (maxCookingTimeMinutes) {
      dbQuery.where = Object.assign(
        {},
        dbQuery.where,
        { cookingTimeMinutes: { $lte: maxCookingTimeMinutes } }
      );
    }


    return db.Recipe.findAll(dbQuery)
      .then(recipes => {
        if (!recipes) {
          return res.status(404).json();
        }
        return res.status(200).json(recipes);
      })
      .catch(next);
  });

  app.get(`${config.apiBaseUrl}/recipes/:id`, (req, res, next) => {
    return db.Recipe.findOne({
      where: { id: req.params.id },
      include: inclusionQuery.include
    })
      .then(recipe => {
        if (!recipe) {
          return res.status(404).json();
        }
        return res.status(200).json(recipe);
      })
      .catch(next);
  });
};
