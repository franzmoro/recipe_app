'use strict';

module.exports = ({ app, db, config }) => {
  app.get(`${config.apiBaseUrl}/recipes`, (req, res, next) => {
    const searchInput = req.query.search;

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

    const dbFriendlyInput = searchInput && `%${searchInput.toLowerCase()}%`;
    const queryWithSearch = Object.assign(
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

    const dbQuery = searchInput ? queryWithSearch : inclusionQuery;

    return db.Recipe.findAll(dbQuery)
      .then(recipes => {
        if (!recipes) {
          return res.status(404).json();
        }
        return res.status(200).json(recipes);
      })
      .catch(next);
  });
};
