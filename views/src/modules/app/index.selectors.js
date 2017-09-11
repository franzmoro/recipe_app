import * as recipesSelectors from '../recipes/index.selectors';
import * as searchSelectors from '../search/index.selectors';

export const getRecipes = (state = {}) => recipesSelectors.getRecipes(state.recipes);
export const getLoadingStatus = (state = {}) => recipesSelectors.getLoadingStatus(state.recipes);
export const getLoadingError = (state = {}) => recipesSelectors.getLoadingError(state.recipes);

export const getMaxCookingTime = (state = {}) => searchSelectors.getMaxCookingTime(state.search);
export const getTextSearch = (state = {}) => searchSelectors.getTextSearch(state.search);
