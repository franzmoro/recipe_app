import { createAction } from '../../utility/action.utils';
import * as actionTypes from './index.actionTypes';
import * as recipesApi from './index.api';

export const retrieveRecipes = filterParams => createAction(
  actionTypes.RETRIEVE_RECIPES,
  { promise: recipesApi.getRecipes(filterParams) }
);
