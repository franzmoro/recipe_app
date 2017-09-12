import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import RecipeItem from '../RecipeItem';

import * as globalSelectors from '../../../app/index.selectors';
import * as recipesActionCreators from '../../index.actionCreators';

class RecipesList extends Component {
  componentDidMount() {
    const {
      recipes,
      retrieveRecipes,
    } = this.props;

    const recipeIds = Object.keys(recipes);
    if (!recipeIds.length) {
      retrieveRecipes();
    }
  }

  render() {
    const {
      recipes,
      isLoading,
      loadingError,
    } = this.props;

    const NO_RECIPES_MESSAGE = 'Sorry, we currently have no recipes for you';

    const showTable = Boolean(recipes.length);
    return (
      <div>
        {isLoading && <Loader />}
        {loadingError
          ? (
            <div>
              <p>{NO_RECIPES_MESSAGE}</p>
            </div>
          )
          : showTable && (
            recipes.map(recipe => (
              <RecipeItem key={recipe.id} {...recipe} />
            ))
          )
        }
      </div>
    );
  }
}

RecipesList.propTypes = {
  recipes: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingError: PropTypes.string,
  retrieveRecipes: PropTypes.func.isRequired,
};

RecipesList.defaultProps = {
  loadingError: undefined,
  maxCookingTime: undefined,
};

const mapStateToProps = state => ({
  recipes: globalSelectors.getRecipes(state),
  isLoading: globalSelectors.getLoadingStatus(state),
  loadingError: globalSelectors.getLoadingError(state),
});

const mapDispatchToProps = dispatch => ({
  retrieveRecipes: params => dispatch(recipesActionCreators.retrieveRecipes(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
