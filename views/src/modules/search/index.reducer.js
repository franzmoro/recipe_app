import * as actionTypes from './index.actionTypes';

export const INITIAL_STATE = {
  maxCookingTime: undefined,
  textSearch: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_MAX_COOKING_TIME:
      return {
        ...state,
        maxCookingTime: action.payload,
      };

    case actionTypes.SET_TEXT_SEARCH:
      return {
        ...state,
        textSearch: action.payload,
      };

    default:
      return state;
  }
};
