'use strict';
const MODEL_NAME = 'Ingredient';

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
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
    }, {
      tableName: 'ingredients',
      freezeTableName: true,
      timestamps: true,
    }
  );

  Ingredient.associate = models => {
    Ingredient.hasMany(models.RecipeLineItem, {
      foreignKey: { name: 'ingredientId' }
    });
  };

  return Ingredient;
};
