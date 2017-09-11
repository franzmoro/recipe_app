'use strict';
const MODEL_NAME = 'Recipe';

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    MODEL_NAME,
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      cookingTimeMinutes: {
        type: DataTypes.INTEGER,
        field: 'cooking_time_minutes',
        allowNull: false,
      },
    }, {
      tableName: 'recipes',
      freezeTableName: true,
      timestamps: true,
    }
  );

  Recipe.associate = models => {
    Recipe.hasMany(models.RecipeImage, {
      foreignKey: { name: 'recipeId' }
    });
  };

  return Recipe;
};
