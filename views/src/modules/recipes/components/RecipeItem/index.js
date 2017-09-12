import React from 'react';
import PropTypes from 'prop-types';
import styles from './style';
import CookingTime from '../CookingTime';

const RecipeItem = ({ name, cookingTimeMinutes, lineItems, images }) => {
  const ingredients = lineItems.map(({ ingredient: { name } }) => name);
  const defaultImage = {
    url: 'https://www.rd.com/wp-content/uploads/sites/2/2012/01/Taco-Meatball-Ring-sl.jpg',
  };
  const firstImage = images[0] || defaultImage;

  const backgroundStyle = {
    display: 'inline-block',
    width: '30%',
    minHeight: 250,
    background: `url('${firstImage.url}') no-repeat center center`,
    backgroundSize: 'cover',
  };

  return (
    <div style={styles.recipeItemContainer}>
      <div style={backgroundStyle} />
      <div style={styles.recipeBasicInfo}>
        <span style={styles.name}>{name}</span>
        <CookingTime cookingTimeMinutes={cookingTimeMinutes} />
        <div style={styles.mainIngredientsList}>
          <div className="glyphicon glyphicon-shopping-cart">
            <span style={styles.ingredientsTitle}>Ingredients</span>
          </div>
          <ul style={styles.mainIngredientsText}>
            {ingredients.map(ingredient => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
  name: PropTypes.string.isRequired,
  cookingTimeMinutes: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  lineItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
      unit: PropTypes.string,
      ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default RecipeItem;
