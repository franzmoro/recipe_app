import { combineReducers } from 'redux';
import recipesReducer from '../recipes/index.reducer';
import searchReducer from '../search/index.reducer';

export default combineReducers({
  recipes: recipesReducer,
  search: searchReducer,
});
