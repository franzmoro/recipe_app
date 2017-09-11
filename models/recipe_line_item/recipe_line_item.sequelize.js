'use strict';
const MODEL_NAME = 'RecipeLineItem';

module.exports = (sequelize, DataTypes) => {
  const RecipeLineItem = sequelize.define(
    MODEL_NAME,
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'recipe_id',
      },
      ingredientId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'ingredient_id',
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        defaultValue: '',
      }
    }, {
      tableName: 'recipe_line_items',
      freezeTableName: true,
      timestamps: true,
    }
  );

  RecipeLineItem.associate = models => {
    RecipeLineItem.belongsTo(models.Recipe, {
      as: 'recipe',
      foreignKey: { name: 'recipeId' }
    });
    RecipeLineItem.belongsTo(models.Ingredient, {
      as: 'ingredient',
      foreignKey: { name: 'ingredientId' }
    });
  };

  return RecipeLineItem;
};
