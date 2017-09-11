'use strict';
const MODEL_NAME = 'RecipeImage';

module.exports = (sequelize, DataTypes) => {
  const RecipeImage = sequelize.define(
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
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'recipe_images',
      freezeTableName: true,
      timestamps: true,
    }
  );

  RecipeImage.associate = models => {
    RecipeImage.belongsTo(models.Recipe, {
      foreignKey: { name: 'recipeId' }
    });
  };

  return RecipeImage;
};
